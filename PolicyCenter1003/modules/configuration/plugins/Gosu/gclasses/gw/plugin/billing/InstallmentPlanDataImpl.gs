package gw.plugin.billing

uses gw.api.util.MonetaryAmounts
uses gw.pl.currency.MonetaryAmount

@Export
class InstallmentPlanDataImpl extends AbstractPaymentPlanData implements InstallmentPlanData {
  var _name: String as Name
  var _downPayment: MonetaryAmount as DownPayment
  var _installment: MonetaryAmount as Installment
  var _oneTimeFee: MonetaryAmount as OneTimeFee
  var _tax: MonetaryAmount as Tax
  var _total: MonetaryAmount as Total
  var _invoiceFrequency: BillingPeriodicity as InvoiceFrequency
  var _numberOfInstallments : Integer as NumberOfInstallments

  override function doCreatePaymentPlanSummary(paymentPlanSummary: PaymentPlanSummary) {
    paymentPlanSummary.PaymentPlanType = PaymentMethod.TC_INSTALLMENTS
    paymentPlanSummary.DownPayment = _downPayment
    paymentPlanSummary.Installment = _installment
    paymentPlanSummary.Tax = _tax
    paymentPlanSummary.Total = _total
    paymentPlanSummary.Name = _name
    if (_invoiceFrequency != null) {
      paymentPlanSummary.InvoiceFrequency = _invoiceFrequency
    }
  }

  override function doPopulateFromPaymentPlanSummary(paymentPlanSummary: PaymentPlanSummary) {
    if (paymentPlanSummary.PaymentPlanType != PaymentMethod.TC_INSTALLMENTS) {
      throw new IllegalArgumentException("Cannot populate a InstallmentPlanData from a PaymentPlanSummary that does not have PaymentPlanType of Installments")
    }

    _name = paymentPlanSummary.Name
    _downPayment = paymentPlanSummary.DownPayment
    _installment = paymentPlanSummary.Installment
    _total = paymentPlanSummary.Total
    _tax = paymentPlanSummary.Tax
    _invoiceFrequency = paymentPlanSummary.InvoiceFrequency
  }

  override function isSameBillingPaymentPlan(otherPlan : PaymentPlanData) : boolean {
    return (otherPlan != null)
        and (otherPlan.InstallmentsPlan)
        and (otherPlan.BillingId == this.BillingId)
  }

  override function isSameBillingPaymentPlan(summary: PaymentPlanSummary): boolean {
    if(summary == null) {
      return false
    } else {
      return summary.BillingId == this.BillingId and Name == summary.Name and InvoiceFrequency == summary.InvoiceFrequency and
          sameMonetaryAmounts({{Total, summary.Total}, {DownPayment, summary.DownPayment},
          {Installment, summary.Installment}, {Tax, summary.Tax}, {Fee, summary.Fee}, {TotalFees, summary.TotalFees}})
    }
  }

  private function sameMonetaryAmounts(monetaryAmountPairs : MonetaryAmount[][]) : boolean {
    for (var moneytaryPair in monetaryAmountPairs) {
      if (not MonetaryAmounts.isEqualIgnoringScale(moneytaryPair[0], moneytaryPair[1])) {
        return false
      }
    }
    return true
  }

  override property get InstallmentsPlan() : boolean {
    return true
  }
}