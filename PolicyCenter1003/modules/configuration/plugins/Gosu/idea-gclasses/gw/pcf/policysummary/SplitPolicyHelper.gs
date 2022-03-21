package gw.pcf.policysummary

@Export
class SplitPolicyHelper {

  static function forwardToJobOrPolicy(sPeriod: PolicyPeriod, isBound: boolean) {
    if (isBound) {
      pcf.PolicyFileForward.go(sPeriod.PolicyNumber)
    } else {
      pcf.JobForward.go(sPeriod.Job)
    }
  }

  static function filteredDividedPolicies(period: PolicyPeriod): SplitPolicyInfo[] {
    var splitPolicies = period.Policy.DividedPolicies.where(\p ->
        (p.BoundPeriods.length > 0 or
            (p.LatestPeriod.Status != PolicyPeriodStatus.TC_WITHDRAWN and
                p.LatestPeriod.Status != PolicyPeriodStatus.TC_DECLINED and
                p.LatestPeriod.Status != PolicyPeriodStatus.TC_NOTTAKEN)))
    return splitPolicies.map(\splitPolicy -> new SplitPolicyInfo(splitPolicy))
  }

  static class SplitPolicyInfo {
    final var _isBound: boolean as IsBound
    final var _period: PolicyPeriod as Period
    final var _policy: Policy as Policy

    construct(splitPolicy: Policy) {
      _policy = splitPolicy
      _isBound = splitPolicy.BoundPeriods.Count > 0
      _period = _isBound ? splitPolicy.LatestBoundPeriod : splitPolicy.LatestPeriod
    }
  }

}