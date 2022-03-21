package gw.losshistory

uses gw.api.locale.DisplayKey
uses com.guidewire.pl.system.filters.BeanBasedQueryFilter

@Export
class ClaimPolicyPeriodFilter implements BeanBasedQueryFilter {

  var  _policyPeriod : PolicyPeriod
  
  construct(policyPeriod : PolicyPeriod) {
    _policyPeriod = policyPeriod
  }

  override function applyFilter( obj : Object ) : boolean {
    var claim = obj as Claim
    var policyPeriod = claim.PolicyPeriod
    return (policyPeriod.PeriodStart == _policyPeriod.PeriodStart &&
            policyPeriod.getCoverageEndDate() == _policyPeriod.getCoverageEndDate()) 
  }
  
  function getPolicyPeriod() : PolicyPeriod {
    return _policyPeriod
  }
  
  
  override function toString() : String {
    var policyPeriodDisplay = _policyPeriod.getPolicyPeriodDateDisplay()
    if(_policyPeriod.PolicyTerm.CheckArchived){
      return  DisplayKey.get("Web.Claims.Archived", policyPeriodDisplay)}     
    else
    return _policyPeriod.getPolicyPeriodDateDisplay()
  }

}
