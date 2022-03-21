package gw.losshistory

uses gw.api.locale.DisplayKey
uses gw.api.util.CoreFilters
uses com.guidewire.pl.system.filters.BeanBasedQueryFilter
uses java.util.ArrayList

@Export
class ClaimPolicyPeriodFilterSet {
  
  var _claims : Claim[]
  public static var NO_POLICY_IN_FORCE : BeanBasedQueryFilter = new NoPolicyInforceFilter() 
  
  construct(claims : Claim[]) {
    _claims = claims
  }
  
  function getAllFilter() : BeanBasedQueryFilter {
    return CoreFilters.ALL  
  }

  function getNoPolicyInforceFilter() : BeanBasedQueryFilter {
    return NO_POLICY_IN_FORCE  
  }
  
  function getClaimPolicyPeriodFilters() : ClaimPolicyPeriodFiltersClass {
    return new ClaimPolicyPeriodFiltersClass()
  }
 
  final public static class NoPolicyInforceFilter implements BeanBasedQueryFilter {
    override function applyFilter( obj : Object ) : boolean {
      var claim = obj as Claim
      return !claim.PolicyInForce
    }

    override function toString() : String {
      return DisplayKey.get("Web.Claims.NoPolicyPeriod")
    }
  }
  
  final public class ClaimPolicyPeriodFiltersClass {
    public function getFilterOptions() : BeanBasedQueryFilter[] {
      // Jira PC-14452 : cache the filter list
      var uniquePolicyPeriods = new ArrayList<PolicyPeriod>()
      var filters = new ArrayList<ClaimPolicyPeriodFilter>()
        var sortedClaim = _claims
      if (_claims != null && _claims.Count > 1) {
        sortedClaim = _claims.sortByDescending( \ c -> c.PolicyPeriod.PeriodStart )
      }
      for(claim in sortedClaim) {
        var policyPeriod = claim.PolicyPeriod
        if (policyPeriod != null && 
            uniquePolicyPeriods.firstWhere( \ p -> p.PeriodStart == policyPeriod.PeriodStart && 
                                                   p.getCoverageEndDate() == policyPeriod.getCoverageEndDate()) == null ) {
          uniquePolicyPeriods.add(policyPeriod)
          filters.add( new ClaimPolicyPeriodFilter(policyPeriod))
        }
        
      }
      return filters.toArray(new BeanBasedQueryFilter[filters.Count])  
    }
  }
  
  
  
}
