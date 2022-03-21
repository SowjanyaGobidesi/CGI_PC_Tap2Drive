package gw.web.policy

uses gw.api.locale.DisplayKey
uses gw.api.util.MonetaryAmounts
uses gw.billing.PolicyPeriodBillingInstructionsManager
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.InstallmentPlanData

/**
 * Defines utility methods to help render {@link InstallmentPlanData} properties
 * for display in a user interface.
 */
@Export
class InstallmentPlanDataRenderHelper {
  var _tax : MonetaryAmount as readonly Tax
  var _totalPremium : MonetaryAmount as readonly TotalPremium

  construct(totalPremium : MonetaryAmount) {
    _totalPremium = totalPremium
  }

  @Deprecated(:value="Tax field was moved from InstallmentPlanDataRenderHelper class to InstallmentPlanData class. Please use constructor with single parameter.", :version="PC 9.0.3")
  construct(tax : MonetaryAmount, totalPremium : MonetaryAmount) {
    _tax = tax
    _totalPremium = totalPremium
  }

  private property get Currency() : Currency {
    return TotalPremium.Currency
  }

  @Deprecated(:value="Tax field was moved from InstallmentPlanDataRenderHelper class to InstallmentPlanData class.", :version="PC 9.0.3")
  property get HasTax() : boolean {
    return hasValue(Tax)
  }

  function renderInvoiceStreamInterval(billingMethodState : PolicyPeriodBillingInstructionsManager) : String {
    if (billingMethodState.CustomBilling) {
      if (billingMethodState.NewInvoicing
          && billingMethodState.InvoiceStreamInterval != null) {
        return billingMethodState.InvoiceStreamInterval.toString()
      } else if (billingMethodState.InvoiceStream?.Interval != null) {
        return billingMethodState.InvoiceStream.Interval.toString()
      }
    } else if (billingMethodState.OverriddenInvoiceStream
        // billingMethodState.InvoiceStreamInterval is null if no available payment plan is returned from BC.
        and billingMethodState.InvoiceStreamInterval != null) {
      return billingMethodState.InvoiceStreamInterval.toString()
    } else {
      return billingMethodState.PaymentPlanChoice?.PaymentFrequency?.toString()
    }
    return "-"
  }

  function renderInvoiceStreamDays(billingMethodState : PolicyPeriodBillingInstructionsManager) : String {
    if (billingMethodState.CustomBilling) {
      if (billingMethodState.NewInvoicing) {
        return customInvoiceDays(billingMethodState)
      } else if (billingMethodState.InvoiceStream?.Days != null) {
        return billingMethodState.InvoiceStream.Days
      }
    } else if (billingMethodState.OverriddenInvoiceStream) {
      return customInvoiceDays(billingMethodState)
    } else {
      return DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.BillingAccountDefault')
    }
    return "-"
  }

  private function customInvoiceDays(billingMethodState : PolicyPeriodBillingInstructionsManager) : String {
    var result = new StringBuilder()
    if (billingMethodState.FirstDayOfMonthVisible) {
      result.append(billingMethodState.FirstDayOfMonth ?: DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.BillingAccountDefault'))
      if (billingMethodState.SecondDayOfMonthVisible) {
        result.append(", ").append(billingMethodState.SecondDayOfMonth ?: DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.BillingAccountDefault'))
      }
    } else if (billingMethodState.DayOfWeekVisible) {
      result.append(billingMethodState.DayOfWeek.DisplayName ?: DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.BillingAccountDefault'))
    } else if (billingMethodState.PaymentDateVisible) {
      result.append(billingMethodState.FirstAnchorDate.ShortFormat ?: DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.BillingAccountDefault'))
    }
    return result.toString();
  }

  function renderInvoiceStreamPaymentInstrument(billingMethodState : PolicyPeriodBillingInstructionsManager) : String {
    if (billingMethodState.CustomBilling) {
      if (billingMethodState.NewInvoicing) {
        if (billingMethodState.Automatic) {
          return billingMethodState.PaymentInstrument.DisplayName
        } else {
          return DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.Manual')
        }
      } else if (billingMethodState.InvoiceStream != null) {
        return billingMethodState.InvoiceStream.PaymentInstrumentName
      }
    } else if (billingMethodState.OverriddenInvoiceStream) {
      return billingMethodState.PaymentInstrument.DisplayName
    } else {
      return DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.BillingAccountDefault')
    }
    return "-"
  }

  function renderInvoiceStreamDueDate(billingMethodState : PolicyPeriodBillingInstructionsManager) : String {
    if (billingMethodState.CustomBilling) {
      if (billingMethodState.NewInvoicing) {
        return displayStringFor(billingMethodState.DueDateBilling)
      } else if (billingMethodState.InvoiceStream != null) {
        return displayStringFor(billingMethodState.InvoiceStream.DueDateBilling)
      }
    } else if (billingMethodState.OverriddenInvoiceStream and billingMethodState.DueDateBilling != null) {
      return displayStringFor(billingMethodState.DueDateBilling)
    } else {
      var dueDateString = billingMethodState.PaymentPlanChoice.BillDateOrDueDateBilling
      if(dueDateString != null) {
        return dueDateString.DisplayName
      } else {
        return DisplayKey.get('Web.Policy.Payment.InvoiceStreamsLV.BillingAccountDefault')
      }
    }
    return "-"
  }

  private function displayStringFor(hasDueDateBilling : Boolean) : String {
    return  hasDueDateBilling
        ? BillDateOrDueDateBilling.TC_DUEDATEBILLING.DisplayName
        : BillDateOrDueDateBilling.TC_BILLDATEBILLING.DisplayName
  }

  function renderInstallmentFrequency(planData : InstallmentPlanData) : String {
    return planData == null || planData.InvoiceFrequency == null
        ? "-"
        : planData.InvoiceFrequency.toString();
  }

  function renderDownPayment(planData : InstallmentPlanData) : String {
    if (planData == null || !hasValue(planData.DownPayment) and !hasValue(planData.Tax)) {
      return "-"
    }

    var defaultOneTimeFee = (planData.DownPayment == null) ? 0bd.ofDefaultCurrency() : 0bd.ofCurrency(planData.DownPayment.Currency)
    var oneTimeFee = planData.OneTimeFee ?: defaultOneTimeFee
    return MonetaryAmounts.render(getMonetaryValue(planData.DownPayment) + getMonetaryValue(planData.Tax) + oneTimeFee)
  }

  function renderDownPaymentDetail(planData : InstallmentPlanData) : String {
    if (planData == null) {
      return ""
    }

    final var downPayment = planData.DownPayment
    final var tax = planData.Tax
    if (!hasValue(downPayment) and !hasValue(tax)) {
      return ""
    } else if (!hasValue(tax)) {
      // down payment only, no taxes...
      return DisplayKey.get('Web.Policy.Payment.InstallmentsPlansLV.PremiumDetail', MonetaryAmounts.render(downPayment)) + getOneTimeFeeDisplayKey(planData)
    } else if (!hasValue(downPayment)) {
      // no down payment, taxes only...
      return DisplayKey.get('Web.Policy.Payment.InstallmentsPlansLV.TaxDetail', MonetaryAmounts.render(tax)) + getOneTimeFeeDisplayKey(planData)
    }
    return DisplayKey.get('Web.Policy.Payment.InstallmentsPlansLV.DownPaymentDetail', MonetaryAmounts.render(downPayment), MonetaryAmounts.render(tax)) + getOneTimeFeeDisplayKey(planData)
  }

  private function getOneTimeFeeDisplayKey(planData : InstallmentPlanData) : String {
    return planData.OneTimeFee != null && planData.OneTimeFee.IsNotZero
        ? DisplayKey.get('Web.Policy.Payment.InstallmentsPlansLV.DownPaymentDetailFee', MonetaryAmounts.render(planData.OneTimeFee))
           : ""
  }

  function renderNumberOfInstallments(planData : InstallmentPlanData) : String {
    if (planData == null || planData.NumberOfInstallments == null) {
      return "0"
    }

    return planData.NumberOfInstallments.toString()
  }

  function renderInstallment(planData : InstallmentPlanData) : String {
    if (planData == null || !hasValue(planData.Installment) and !hasValue(planData.Fee)) {
      return "-"
    }
    return MonetaryAmounts.render(getMonetaryValue(planData.Installment)
        + getMonetaryValue(planData.Fee))
  }

  function renderInstallmentDetail(planData : InstallmentPlanData) : String {
    if (planData == null) {
      return ""
    }
    final var installment = planData.Installment
    if (!hasValue(installment) and !hasValue(planData.Fee)) {
      return ""
    } else if (!hasValue(planData.Fee)) {
      // installment only, no fee...
      return DisplayKey.get('Web.Policy.Payment.InstallmentsPlansLV.PremiumDetail', MonetaryAmounts.render(installment))
    } else if (!hasValue(installment)) {
      // no installment, fee only...
      return DisplayKey.get('Web.Policy.Payment.InstallmentsPlansLV.FeeDetail', MonetaryAmounts.render(planData.Fee))
    }
    return DisplayKey
        .get('Web.Policy.Payment.InstallmentsPlansLV.InstallmentDetail', MonetaryAmounts.render(installment), MonetaryAmounts.render(planData.Fee))
  }

  function renderTotal(planData : InstallmentPlanData) : String {
    return MonetaryAmounts.render(planData.Total) // includes tax...
  }

  function renderTotalDetail(planData: InstallmentPlanData) : String {
    final var totalPremiumRender = MonetaryAmounts.render(TotalPremium)
    final var fees = planData.TotalFees
    final var tax = planData.Tax
    if (hasValue(fees) and hasValue(tax)) {
      return DisplayKey
          .get('Web.Policy.Payment.InstallmentsPlansLV.TotalDetail',
              totalPremiumRender, MonetaryAmounts.render(tax),
              MonetaryAmounts.render(fees))
    } else if (hasValue(tax)) {
      return DisplayKey
          .get('Web.Policy.Payment.InstallmentsPlansLV.TotalWOFeesDetail',
              totalPremiumRender, MonetaryAmounts.render(tax))
    } else if (hasValue(fees)) {
      return DisplayKey
          .get('Web.Policy.Payment.InstallmentsPlansLV.TotalWOTaxDetail',
              totalPremiumRender, MonetaryAmounts.render(fees))
    }
    return DisplayKey
        .get('Web.Policy.Payment.InstallmentsPlansLV.PremiumDetail',
            totalPremiumRender)
  }

  /**
   * @param the {@link MonetaryAmount} value
   * @return Whether the {@code value} is not null and not zero.
   */
  private function hasValue(value : MonetaryAmount) : boolean {
    return value != null and value.IsNotZero
  }

  /**
   * @param the {@link MonetaryAmount} value
   * @return The {@code value} if not null, or {@code 0}.
   */
  private function getMonetaryValue(value : MonetaryAmount) : MonetaryAmount {
    return value?:0bd.ofCurrency(Currency)
  }
}
