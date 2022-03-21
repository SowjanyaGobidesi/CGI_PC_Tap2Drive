package gw.plugin.billing

uses typekey.BillingPeriodicity

enhancement PaymentPlanDataEnhancement : gw.plugin.billing.PaymentPlanData {
  property get PaymentFrequency() : BillingPeriodicity {
    if (this typeis ReportingPlanData) {
      return BillingPeriodicity.TC_MONTHLY
    }
    switch((this as InstallmentPlanData).InvoiceFrequency) {
      case TC_TWICEPERMONTH:
        return TC_TWICEPERMONTH
      case TC_EVERYWEEK:
        return TC_EVERYWEEK
      case TC_EVERYOTHERWEEK:
        return TC_EVERYOTHERWEEK
      default:
        return TC_MONTHLY
    }
  }
}
