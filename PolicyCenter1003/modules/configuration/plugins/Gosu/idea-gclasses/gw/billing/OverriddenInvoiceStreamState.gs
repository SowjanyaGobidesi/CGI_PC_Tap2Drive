package gw.billing

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.billing.PaymentPlanData

@Export
class OverriddenInvoiceStreamState extends AbstractInvoiceStreamState {

  protected construct(parent : InvoiceStreamStateContainerImpl) {
    super(parent)
  }

  override property get InvoicingMethod() : InvoicingMethod {
    return TC_OVERRIDDENINVOICESTREAM
  }

  override function updateInvoiceStreamAccordingToPaymentPlan(plan : PaymentPlanData) {
    InvoiceStreamInterval = plan.PaymentFrequency
  }

  override function populateFromPolicyPeriod(period: PolicyPeriod) {
    super.populateFromPolicyPeriod(period)
    DueDateBilling = period.InvoiceStreamOverrides.DueDateBilling
    FirstDayOfMonth = period.InvoiceStreamOverrides.FirstDayOfMonth
    SecondDayOfMonth = period.InvoiceStreamOverrides.SecondDayOfMonth
    DayOfWeek = period.InvoiceStreamOverrides.DayOfWeek
    FirstAnchorDate = period.InvoiceStreamOverrides.AnchorDate
    Description = period.InvoiceStreamOverrides.Description
    PaymentInstruments = Container.retrieveAvailablePaymentInstruments()
    PaymentInstrument = PaymentInstruments.firstWhere(\elt -> elt.PublicID == period.InvoiceStreamOverrides.PaymentInstrumentID)
    updateInvoiceStreamAccordingToPaymentPlan(Container.PaymentPlanChoice)
  }

  override function saveStateToPolicyPeriod(period : PolicyPeriod) {
    super.saveStateToPolicyPeriod(period)
    if (Container.AllowOverriddenInvoiceStream) {
      saveOverridingInvoiceStreamToPolicyPeriod(period)
    }
  }

  override function validate() {
    super.validate()
    validateTwicePerMonthInvoiceStreamFrequency()
  }

  private function validateTwicePerMonthInvoiceStreamFrequency () {
    if (InvoiceStreamInterval == BillingPeriodicity.TC_TWICEPERMONTH
        and ((FirstDayOfMonth == null and SecondDayOfMonth != null)
        or (FirstDayOfMonth != null and SecondDayOfMonth == null))) {
      throw new DisplayableException(DisplayKey.get("Web.Policy.Payment.InvoiceStreamsLV.TwiceAMonth.FillBothDates"))
    }
  }

  override protected function resetInvoiceStreamsAndPaymentInstruments() {
    updateInvoiceStreamAccordingToPaymentPlan(Container.PaymentPlanChoice)
    PaymentInstruments = Container.retrieveAvailablePaymentInstruments()
    PaymentInstrument = PaymentInstruments.first()
    Container.invalidatePCFElementIterators(BillingPaymentInstrument)
  }

  private function saveOverridingInvoiceStreamToPolicyPeriod(period : PolicyPeriod) {
    if (period.InvoiceStreamOverrides == null) {
      period.InvoiceStreamOverrides = new InvoiceStreamOverrides(period)
    }
    period.InvoiceStreamOverrides.PaymentInstrumentID = PaymentInstrument?.PublicID
    period.InvoiceStreamOverrides.DueDateBilling = DueDateBilling
    period.InvoiceStreamOverrides.FirstDayOfMonth = FirstDayOfMonth
    period.InvoiceStreamOverrides.SecondDayOfMonth = SecondDayOfMonth
    period.InvoiceStreamOverrides.DayOfWeek = DayOfWeek
    period.InvoiceStreamOverrides.AnchorDate = FirstAnchorDate
    period.InvoiceStreamOverrides.Description = Description
  }
}