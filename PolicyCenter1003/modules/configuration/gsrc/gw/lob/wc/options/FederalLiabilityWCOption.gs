package gw.lob.wc.options

uses gw.api.locale.DisplayKey
uses gw.api.upgrade.PCCoercions
uses gw.api.productmodel.CoveragePattern

@Export
class FederalLiabilityWCOption extends WCOption {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }
  
  override property get Label() : String {
    return DisplayKey.get("Web.Policy.WC.FederalLiability")
  }
  
  override property get Mode() : String {
    return "FederalLiability"
  }
  
  override function addToPolicy() {
    WCLine.setCoverageExists(PCCoercions.makeProductModel<CoveragePattern>("WCFedEmpLiabCov"), true)
  }
  
  override function removeFromPolicy() {
    WCLine.setCoverageExists(PCCoercions.makeProductModel<CoveragePattern>("WCFedEmpLiabCov"), false) 
    for (emp in WCLine.WCFedCoveredEmployees) {
      WCLine.removeFromWCFedCoveredEmployees(emp)
    }
  }
  
  override function isOnPolicy() : boolean {
    return WCLine.WCFedEmpLiabCovExists
  }
}