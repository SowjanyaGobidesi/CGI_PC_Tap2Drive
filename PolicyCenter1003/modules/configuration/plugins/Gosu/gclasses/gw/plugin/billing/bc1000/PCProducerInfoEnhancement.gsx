package gw.plugin.billing.bc1000

uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.PCProducerInfo_CurrencyPlanPairs
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PCContactInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PCProducerInfo

@Export
enhancement PCProducerInfoEnhancement : PCProducerInfo {
  function sync(organization : Organization){
    this.ProducerName = organization.Name
    this.ProducerNameKanji = organization.NameKanji
    this.CurrencyPlanPairs = organization.AgencyBillPlans
        .map(\plan -> new PCProducerInfo_CurrencyPlanPairs() {
          :Currency = plan.Currency.Code,
          :PlanID = plan.PlanID
        }).toList()
    this.PublicID = organization.PublicID
    this.Tier = organization.Tier.Code
    var contactInfo = new PCContactInfo()
    contactInfo.sync( organization.Contact )
    this.PrimaryContact.$TypeInstance = contactInfo
  }
}
