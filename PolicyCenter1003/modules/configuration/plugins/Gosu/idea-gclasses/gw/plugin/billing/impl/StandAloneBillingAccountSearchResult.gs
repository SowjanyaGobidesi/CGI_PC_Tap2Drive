package gw.plugin.billing.impl
uses gw.plugin.billing.BillingAccountSearchResult

@Export
class StandAloneBillingAccountSearchResult implements BillingAccountSearchResult {
  var _accountNumber : String as AccountNumber
  var _accountName : String as AccountName
  var _accountNameKanji : String as AccountNameKanji
  var _primaryPayer : String as PrimaryPayer
  var _currency : Currency as Currency
  var _isListBill : Boolean as IsListBill

  function isListBill(accountCurrency : Currency) : boolean {
    return IsListBill != null and IsListBill
  }
}
