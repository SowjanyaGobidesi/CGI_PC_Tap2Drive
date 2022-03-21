package gw.plugin.billing.bc900

uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCNewProducerInfo
uses gw.api.util.CurrencyUtil

@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement PCNewProducerInfoEnhancement: PCNewProducerInfo {
    function syncNew(organization : Organization) {
      this.sync(organization)
      this.PreferredCurrency = CurrencyUtil.DefaultCurrency.Code
    }
}
