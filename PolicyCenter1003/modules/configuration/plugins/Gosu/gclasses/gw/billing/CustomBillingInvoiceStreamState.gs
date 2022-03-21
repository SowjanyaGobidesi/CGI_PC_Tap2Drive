package gw.billing

uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.billing.PaymentPlanData

/**
 * This class provides the behavior when creating a Custom Invoice Stream for billing on a PolicyPeriod
 */
@Export
class CustomBillingInvoiceStreamState extends AbstractInvoiceStreamState {

  protected construct(parent : InvoiceStreamStateContainerImpl) {
    super(parent)
  }

  override property get InvoicingMethod() : InvoicingMethod {
    return TC_CUSTOMBILLING
  }

  override function populateFromPolicyPeriod(period: PolicyPeriod) {
    super.populateFromPolicyPeriod(period)
    InvoiceStreamCode = period.InvoiceStreamCode
    InvoiceStreamInterval = period.NewInvoiceStream.Interval
    Automatic = period.NewInvoiceStream.Automatic
    UnappliedFundID = period.NewInvoiceStream.UnappliedFundID
    AccountUnapplied = false
    UnappliedFundDescription = period.NewInvoiceStream.UnappliedFundDescription
    DueDateBilling = period.NewInvoiceStream.DueDateBilling
    FirstDayOfMonth = period.NewInvoiceStream.FirstDayOfMonth
    SecondDayOfMonth = period.NewInvoiceStream.SecondDayOfMonth
    DayOfWeek = period.NewInvoiceStream.DayOfWeek
    FirstAnchorDate = period.NewInvoiceStream.FirstAnchorDate
    Description = period.NewInvoiceStream.Description

    InvoiceStreams = Container.retrieveAvailableInvoiceStreams()
    PaymentInstruments = Container.retrieveAvailablePaymentInstruments()
    PaymentInstrument = PaymentInstruments.firstWhere(\elt -> elt.PublicID == period.NewInvoiceStream.PaymentInstrumentID)
    NewInvoicing = (InvoiceStreamCode == null)
    if (InvoiceStream != null) {
      updateInvoiceStreamAccordingToPaymentPlan(Container.PaymentPlanChoice)
    }
  }

  override function updateInvoiceStreamAccordingToPaymentPlan(plan : PaymentPlanData) {
    var oldInvoiceStreams = InvoiceStreams
    InvoiceStreams = Container.retrieveAvailableInvoiceStreams()
    var validInvoiceStreams = InvoiceStreams*.PublicID
    if (not validInvoiceStreams.contains(InvoiceStreamCode)) {
      if (validInvoiceStreams.IsEmpty) {
        InvoiceStreamCode = null
        NewInvoicing = true
      } else {
        InvoiceStreamCode = validInvoiceStreams.first()
        NewInvoicing = false
      }
    }
    InvoiceStreamInterval = plan.PaymentFrequency

    if (not(Automatic or Container.AllowResponsive)) {
      Automatic = true
    }
    // Refresh the InvoiceStreamsLV only if the list of invoice streams have changed.
    if (!InvoiceStreams*.PublicID.disjunction(oldInvoiceStreams*.PublicID).isEmpty()) {
      Container.invalidatePCFElementIterators(BillingInvoiceStreamInfo)
    }
  }

  override protected function resetInvoiceStreamsAndPaymentInstruments() {
    updateInvoiceStreamAccordingToPaymentPlan(Container.PaymentPlanChoice)
    PaymentInstruments = Container.retrieveAvailablePaymentInstruments()
    PaymentInstrument = PaymentInstruments.first()
    Container.invalidatePCFElementIterators(BillingPaymentInstrument)
  }

  override function clearInvoiceStreamOverridesAttributes() {
    DueDateBilling = false
    FirstDayOfMonth = 1
    SecondDayOfMonth = 15
    DayOfWeek = DayOfWeek.TC_FRIDAY
    FirstAnchorDate = null
    Description = null
    PaymentInstrument = null
  }

  override function saveStateToPolicyPeriod(period : PolicyPeriod) {
    super.saveStateToPolicyPeriod(period)
    if (NewInvoicing) {
      saveNewInvoicingToPolicyPeriod(period)
    }
  }

  private function saveNewInvoicingToPolicyPeriod(period : PolicyPeriod) {
    period.InvoiceStreamCode = null
    period.NewInvoiceStream.Interval = InvoiceStreamInterval
    period.NewInvoiceStream.UnappliedFundID = UnappliedFundID
    period.NewInvoiceStream.UnappliedFundDescription = UnappliedFundDescription
    if (Automatic) {
      period.NewInvoiceStream.PaymentInstrumentID = PaymentInstrument.PublicID
      period.NewInvoiceStream.PaymentMethod = PaymentInstrument.PaymentMethod
    } else {
      period.NewInvoiceStream.PaymentInstrumentID = null
      period.NewInvoiceStream.PaymentMethod = AccountPaymentMethod.TC_RESPONSIVE
    }
    period.NewInvoiceStream.DueDateBilling = DueDateBilling
    period.NewInvoiceStream.FirstDayOfMonth = FirstDayOfMonth
    period.NewInvoiceStream.SecondDayOfMonth = SecondDayOfMonth
    period.NewInvoiceStream.DayOfWeek = DayOfWeek
    period.NewInvoiceStream.FirstAnchorDate = FirstAnchorDate
    period.NewInvoiceStream.Description = Description
  }

}