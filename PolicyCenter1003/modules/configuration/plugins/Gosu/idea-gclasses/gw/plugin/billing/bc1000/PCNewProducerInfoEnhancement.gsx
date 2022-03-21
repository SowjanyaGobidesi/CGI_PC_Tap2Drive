package gw.plugin.billing.bc1000

uses gw.api.util.CurrencyUtil
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PCNewProducerInfo

enhancement PCNewProducerInfoEnhancement: PCNewProducerInfo {
    function syncNew(organization : Organization) {
      this.sync(organization)
      this.PreferredCurrency = CurrencyUtil.DefaultCurrency.Code
    }
}
