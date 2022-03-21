package gw.billing.billingmethod

uses gw.billing.PolicyPeriodBillingInstructionsManager
uses gw.plugin.billing.BillingAccountSearchResult

@Export
class AgencyBillState extends AbstractBillingMethodState {

  construct (container : PolicyPeriodBillingInstructionsManager) {
    super(container)
  }

  override function updateContainer() {
    _container.updateInvoicingMethodType(TC_DEFAULTBILLING)
    _container.AltBillingAccountNumber = null
    _container.AccountContactForBilling = null
  }

  override property get BillingMethod(): BillingMethod {
    return typekey.BillingMethod.TC_AGENCYBILL
  }

  override property get BillingAccountNumber(): String {
    return _container.OwnerBillingAccountNumber
  }

  override function filterAccountsForBillingMethodType(accounts : BillingAccountSearchResult[])
      : BillingAccountSearchResult[] {
    return accounts.where(\account -> !account.isListBill(_container.PreferredSettlementCurrency))
  }
}