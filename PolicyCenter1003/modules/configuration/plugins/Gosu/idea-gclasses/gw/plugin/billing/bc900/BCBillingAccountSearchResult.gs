package gw.plugin.billing.bc900

uses gw.plugin.billing.BillingAccountSearchResult
uses wsi.remote.gw.webservice.bc.bc900.billingapi.types.complex.BCAccountSearchResult

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class BCBillingAccountSearchResult implements BillingAccountSearchResult {
  var _soapObject : BCAccountSearchResult
  
  construct(soapObject : BCAccountSearchResult) {
    _soapObject = soapObject
  }
  
  override property get AccountNumber() : String {
    return _soapObject.AccountNumber
  }

  override property get AccountName() : String {
    return _soapObject.AccountName
  }

  override property get AccountNameKanji() : String {
    return _soapObject.AccountNameKanji
  }

  override property get PrimaryPayer() : String {
    return _soapObject.PrimaryPayer
  }

  override property get Currency() : Currency {
    return Currency.get(_soapObject.Currency.Code)
  }

  override function isListBill(currency : Currency) : boolean { return _soapObject.IsListBill}
}
