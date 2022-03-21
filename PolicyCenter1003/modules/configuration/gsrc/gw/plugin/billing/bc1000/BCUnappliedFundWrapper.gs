package gw.plugin.billing.bc1000

uses gw.plugin.billing.BillingUnappliedFundInfo
uses wsi.remote.gw.webservice.bc.bc1000.billingapi.types.complex.PCUnappliedInfo

@Export
class BCUnappliedFundWrapper implements BillingUnappliedFundInfo {
  var _soapObject : PCUnappliedInfo

  construct(soapObject: PCUnappliedInfo) {
    _soapObject = soapObject
  }

  override property get Description() : String {
    return _soapObject.Description
  }

  override property get PublicID() : String {
    return _soapObject.PublicID
  }
}