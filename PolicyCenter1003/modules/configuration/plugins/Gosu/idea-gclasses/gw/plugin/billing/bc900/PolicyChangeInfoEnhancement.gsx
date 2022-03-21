package gw.plugin.billing.bc900

uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PolicyChangeInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCContactInfo

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement PolicyChangeInfoEnhancement : PolicyChangeInfo
{
  function syncPolicyChange(period : PolicyPeriod){
    commonSync(period)
    var contactInfo = new PCContactInfo()
    contactInfo.sync( period.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact )
    this.PrimaryNamedInsuredContact.$TypeInstance = contactInfo  
  }

  function syncPolicyChangeForPreview(period : PolicyPeriod){
    commonSync(period)  
  }
  
  private function commonSync(period : PolicyPeriod){
    this.syncBasicPolicyInfo( period )
    this.Description = period.PolicyChange.Description
    this.JurisdictionCode = period.BaseState.Code
    this.PeriodStart = period.PeriodStart.XmlDateTime
    this.PeriodEnd = period.PeriodEnd.XmlDateTime
  }
}
