package gw.plugin.billing

uses gw.pl.currency.MonetaryAmount
uses gw.pl.persistence.core.Bundle
uses java.util.List

@Export
abstract class AbstractPaymentPlanData implements PaymentPlanData {
  var _billingId: String as BillingId
  var _notes: String as Notes
  var _fee: MonetaryAmount as Fee
  var _totalFees: MonetaryAmount as TotalFees
  var _allowedPaymentMethods: AccountPaymentMethod[] as AllowedPaymentMethods = {}
  var _billDateOrDueDateBilling : BillDateOrDueDateBilling as BillDateOrDueDateBilling

  property get AllowResponsive(): boolean {
    return _allowedPaymentMethods.contains(AccountPaymentMethod.TC_RESPONSIVE)
  }

  /**
   * Converts this PaymentPlanData object to a PaymentPlanSummary entity.
   */
  override function createPaymentPlanSummary(bundle: Bundle): PaymentPlanSummary {
    var paymentPlanSummary = new PaymentPlanSummary(bundle)

    paymentPlanSummary.BillingId = _billingId
    paymentPlanSummary.Notes = _notes
    paymentPlanSummary.Fee = _fee
    paymentPlanSummary.TotalFees = _totalFees
    paymentPlanSummary.addAllowedPaymentMethods(_allowedPaymentMethods?.toList())
    paymentPlanSummary.BillDateOrDueDateBilling = _billDateOrDueDateBilling

    doCreatePaymentPlanSummary(paymentPlanSummary)
    return paymentPlanSummary
  }

  override function populateFromPaymentPlanSummary(summary : PaymentPlanSummary) {
    _billingId = summary.BillingId
    _notes = summary.Notes
    _fee = summary.Fee
    _totalFees = summary.TotalFees
    _allowedPaymentMethods = summary.AllowedPaymentMethods.toTypedArray()
    _billDateOrDueDateBilling = summary.BillDateOrDueDateBilling
    doPopulateFromPaymentPlanSummary(summary)
  }

  override property get ReportingPlan() : boolean {
    return false
  }

  override property get InstallmentsPlan() : boolean {
    return false
  }

  protected abstract function doCreatePaymentPlanSummary(paymentPlanSummary: PaymentPlanSummary)

  protected abstract function doPopulateFromPaymentPlanSummary(paymentPlanSummary: PaymentPlanSummary)
}