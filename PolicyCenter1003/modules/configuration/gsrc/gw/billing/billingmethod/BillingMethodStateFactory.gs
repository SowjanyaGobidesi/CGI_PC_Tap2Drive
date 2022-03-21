package gw.billing.billingmethod

uses gw.billing.PolicyPeriodBillingInstructionsManager

@Export
class BillingMethodStateFactory {

  static function createBillingMethodState(container : PolicyPeriodBillingInstructionsManager, billingMethod : BillingMethod = null)
      : BillingMethodState {
    switch (billingMethod) {
      case TC_LISTBILL:
        return new ListBillState(container)
      case TC_AGENCYBILL:
        return new AgencyBillState(container)
      case TC_DIRECTBILL:
        return new DirectBillState(container)
      default:
        return new NullBillingMethodState(container)
    }
  }
}