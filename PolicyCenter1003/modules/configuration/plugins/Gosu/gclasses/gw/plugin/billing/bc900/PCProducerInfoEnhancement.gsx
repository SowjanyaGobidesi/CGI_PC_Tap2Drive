package gw.plugin.billing.bc900

uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCProducerInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCContactInfo

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement PCProducerInfoEnhancement : PCProducerInfo {
  function sync(organization : Organization){
    this.ProducerName = organization.Name
    this.ProducerNameKanji = organization.NameKanji
    this.Currencies = organization.AgencyBillPlans*.Currency*.Code.toList()
    this.AgencyBillPlanIDs = organization.AgencyBillPlans*.PlanID.toList()
    this.PublicID = organization.PublicID
    this.Tier = organization.Tier.Code
    var contactInfo = new PCContactInfo()
    contactInfo.sync( organization.Contact )
    this.PrimaryContact.$TypeInstance = contactInfo
  }
}
