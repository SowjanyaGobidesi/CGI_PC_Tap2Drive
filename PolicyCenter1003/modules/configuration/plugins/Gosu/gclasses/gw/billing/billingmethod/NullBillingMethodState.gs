package gw.billing.billingmethod

uses gw.billing.PolicyPeriodBillingInstructionsManager

@Export
class NullBillingMethodState extends AbstractBillingMethodState {

  construct (container : PolicyPeriodBillingInstructionsManager) {
    super(container)
  }

  override function updateContainer() {
  }

  override property get BillingMethod() : BillingMethod {
    return null
  }

  override property get BillingAccountNumber() : String {
    return _container.OwnerBillingAccountNumber
  }
}