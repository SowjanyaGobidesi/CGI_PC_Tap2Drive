package gw.plugin.billing.bc1000

uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PCContactInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PolicyChangeInfo

@Export
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
