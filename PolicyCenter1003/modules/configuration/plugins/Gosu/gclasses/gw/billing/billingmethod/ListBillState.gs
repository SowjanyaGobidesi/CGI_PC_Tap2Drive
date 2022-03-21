package gw.billing.billingmethod

uses gw.billing.PolicyPeriodBillingInstructionsManager
uses gw.plugin.billing.BillingAccountSearchResult

@Export
class ListBillState extends AbstractBillingMethodState {

  construct (container : PolicyPeriodBillingInstructionsManager) {
    super(container)
  }

  override function updateContainer() {
    _container.updateInvoicingMethodType(TC_CUSTOMBILLING)
    _container.AltBillingAccountNumber = null
    _container.AccountContactForBilling = null
    _container.InvoiceStreamCode = null
    _container.resetNewInvoicing()
  }

  override property get BillingMethod() : BillingMethod {
    return typekey.BillingMethod.TC_LISTBILL
  }

  override property get BillingAccountNumber() : String {
    return _container.AltBillingAccountNumber ?: ""
  }

  override property get AlternateBillerVisible() : boolean {
    return true
  }

  override property get AlternateBillerRequired() : boolean {
    return true
  }

  override property get EnableBillingAccountSearchPopup() : boolean {
    return true
  }

  override property get ShowInvoicingLabel() : boolean {
    return true
  }

  override property get EnableInvoicingSelection() : boolean {
    return true
  }

  override property get AllowEmptyInvoiceStreamLV() : boolean {
    return true
  }

  override function filterAccountsForBillingMethodType(accounts : BillingAccountSearchResult[])
      : BillingAccountSearchResult[] {
    return accounts.where( \account -> account.isListBill(_container.PreferredSettlementCurrency))
  }
}