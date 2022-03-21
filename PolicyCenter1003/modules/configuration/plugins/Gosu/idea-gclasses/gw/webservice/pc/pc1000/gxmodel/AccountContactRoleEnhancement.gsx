package gw.webservice.pc.pc1000.gxmodel

uses gw.api.system.PCDependenciesGateway
uses entity.AccountContactRole

enhancement AccountContactRoleEnhancement : gw.webservice.pc.pc1000.gxmodel.accountcontactrolemodel.types.complex.AccountContactRole {
  
  function populateContactRole(contactRole : AccountContactRole){
    switch(this.Subtype){
      case typekey.AccountContactRole.TC_DRIVER: 
        var driver = this.entity_Driver.$TypeInstance
        if(driver != null){
          (contactRole as Driver).DateCompletedTrainingClass = driver.DateCompletedTrainingClass
          gw.webservice.pc.pc1000.gxmodel.SimpleValuePopulator.populate(driver, contactRole)
        }
        break
      case typekey.AccountContactRole.TC_NAMEDINSURED: 
        var namedInsured = this.entity_NamedInsured.$TypeInstance
        if(namedInsured != null){
          gw.webservice.pc.pc1000.gxmodel.SimpleValuePopulator.populate(namedInsured, contactRole)
          (contactRole as NamedInsured).IndustryCode = findSICCode(namedInsured.IndustryCode.Code)
        }
        break
      case typekey.AccountContactRole.TC_OWNEROFFICER: 
        if(this.entity_OwnerOfficer.$TypeInstance != null){
          gw.webservice.pc.pc1000.gxmodel.SimpleValuePopulator.populate(this.entity_OwnerOfficer.$TypeInstance, contactRole)
        }
        break
      default: break
    }
  }
  
  /**
   * Find the SIC industry code.
   */
  static function findSICCode(code : String) : IndustryCode {
    return PCDependenciesGateway.getIndustryCodeFinder().findIndustryCodeByCodeAndType(code, IndustryCodeType.TC_SIC, true)
  }
}
