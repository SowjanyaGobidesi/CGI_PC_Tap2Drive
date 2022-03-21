package gw.billing.billingmethod

uses gw.api.system.PCConfigParameters
uses gw.billing.PolicyPeriodBillingInstructionsManager
uses gw.plugin.billing.BillingAccountSearchResult
uses typekey.*

@Export
class DirectBillState extends AbstractBillingMethodState {

  construct (container : PolicyPeriodBillingInstructionsManager) {
    super(container)
  }

  override function updateContainer() {
    _container.updateInvoicingMethodType(TC_DEFAULTBILLING)
    _container.AltBillingAccountNumber = null
  }

  override property get BillingMethod(): BillingMethod {
    return typekey.BillingMethod.TC_DIRECTBILL
  }

  override property get BillingAccountNumber(): String {
    return _container.AltBillingAccountNumber ?: _container.OwnerBillingAccountNumber
  }

  override property get AlternateBillerVisible() : boolean {
    return true
  }

  override property get SubAccountsVisible() : boolean {
    return true
  }

  override property get BillingContactVisible() : boolean {
    return true
  }

  override property get EnableAccountSearchPopup() : boolean {
    return true
  }

  override property get AllowNewInvoicing() : boolean {
    return true
  }

  override property get AllowOverriddenInvoiceStream() : boolean {
    return typekey.Job.TC_SUBMISSION == _container.PeriodInternal.Job.Subtype
        and BillingLevel.TF_POLICY.TypeKeys.contains(_container.BillingLevel)
        and _container.PaymentPlanChoice != null
  }

  override property get AllowCustomBilling() : boolean {
    return PCConfigParameters.EnableCustomBilling.Value
  }

  override property get EnableInvoicingSelection() : boolean {
    return true
  }

  override function filterAccountsForBillingMethodType(accounts : BillingAccountSearchResult[])
      : BillingAccountSearchResult[] {
    return accounts.where(\account -> !account.isListBill(_container.PreferredSettlementCurrency))
  }
}