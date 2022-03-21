package gw.billing.billingmethod

uses gw.billing.PolicyPeriodBillingInstructionsManager
uses gw.plugin.billing.BillingAccountSearchResult

@Export
abstract class AbstractBillingMethodState implements BillingMethodState {

  protected var _container: PolicyPeriodBillingInstructionsManager

  construct(container : PolicyPeriodBillingInstructionsManager) {
    _container = container
  }

  override function updateBillingMethodType(type : BillingMethod) {
    if (BillingMethod == type) {
      return
    }
    var state = this as BillingMethodState
    if (type != null or !_container.AvailableBillingMethods.contains(BillingMethod)) {
      state = BillingMethodStateFactory.createBillingMethodState(_container, type)
      _container.BillingMethodState = state
    }
    state.updateContainer()
    _container.resetBillingInfo(null)
  }

  override property get AlternateBillerVisible() : boolean {
    return false
  }

  override property get AlternateBillerRequired() : boolean {
    return false
  }

  override property get SubAccountsVisible() : boolean {
    return false
  }

  override property get BillingContactVisible() : boolean {
    return false
  }

  override property get EnableAccountSearchPopup() : boolean {
    return false
  }

  override property get EnableBillingAccountSearchPopup() : boolean {
    return false
  }

  override property get AllowNewInvoicing() : boolean {
    return false
  }

  override property get AllowCustomBilling() : boolean {
    return false
  }

  override property get AllowOverriddenInvoiceStream() : boolean {
    return false
  }

  override property get ShowInvoicingLabel() : boolean {
    return false
  }

  override property get EnableInvoicingSelection() : boolean {
    return false
  }

  override property get AllowEmptyInvoiceStreamLV() : boolean {
    return false
  }

  override function filterAccountsForBillingMethodType(accounts : BillingAccountSearchResult[])
      : BillingAccountSearchResult[] {
    return accounts
  }
}
