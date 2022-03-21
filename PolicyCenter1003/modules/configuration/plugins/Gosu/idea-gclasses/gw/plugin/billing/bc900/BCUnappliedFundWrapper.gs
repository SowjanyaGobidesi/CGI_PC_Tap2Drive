package gw.plugin.billing.bc900
uses wsi.remote.gw.webservice.bc.bc900.billingapi.types.complex.PCUnappliedInfo
uses gw.plugin.billing.BillingUnappliedFundInfo

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
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