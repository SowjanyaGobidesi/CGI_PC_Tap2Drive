package gw.api.databuilder.contact
uses gw.api.databuilder.DataBuilder
uses java.util.Date

@Export
class WCLaborContactDetailBuilder extends DataBuilder<WCLaborContactDetail, WCLaborContactDetailBuilder>{

  construct() {
    super(WCLaborContactDetail)
  }
  
  function withInclusion(inclusion : Inclusion) : WCLaborContactDetailBuilder {
    set(WCLaborContactDetail.Type.TypeInfo.getProperty("Inclusion"), inclusion)
    return this
  }
  
  function asIncluded() : WCLaborContactDetailBuilder {
    return withInclusion(TC_INCL)
  }

  function asExcluded() : WCLaborContactDetailBuilder {
    return withInclusion(TC_EXCL)
  }
  
  function withWorkLocation(workLocation : String) : WCLaborContactDetailBuilder {
    set(WCLaborContactDetail.Type.TypeInfo.getProperty("WorkLocation"), workLocation)
    return this
  }
  
  function withDescriptionOfDuties(descriptionOfDuties : String) : WCLaborContactDetailBuilder {
    set(WCLaborContactDetail.Type.TypeInfo.getProperty("DescriptionOfDuties"), descriptionOfDuties)
    return this
  }
  
  function withNumberOfEmployees(numberOfEmployees : int) : WCLaborContactDetailBuilder {
    set(WCLaborContactDetail.Type.TypeInfo.getProperty("NumberOfEmployees"), numberOfEmployees)
    return this
  }
  
  function withContractEffectiveDate(contractEffectiveDate : Date) : WCLaborContactDetailBuilder {
    set(WCLaborContactDetail.Type.TypeInfo.getProperty("ContractEffectiveDate"), contractEffectiveDate)
    return this
  }
  
  function withContractExpirationDate(contractExpirationDate : Date) : WCLaborContactDetailBuilder {
    set(WCLaborContactDetail.Type.TypeInfo.getProperty("ContractExpirationDate"), contractExpirationDate)
    return this
  }
  
}
