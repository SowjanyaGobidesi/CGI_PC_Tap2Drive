package gw.web.job.submission

@Export
class DividePoliciesLVUIHelper {
  static function forwardToJobOrPolicy(sPeriod : PolicyPeriod, isBound : boolean) {
    if (isBound) {
      pcf.PolicyFileForward.go(sPeriod.PolicyNumber)
    } else {
      pcf.JobForward.go(sPeriod.Job)
    }
  }

  static function useArchiveStyle(sPeriod:PolicyPeriod, isBound:boolean) : boolean {
    if(isBound)
    {
      return (Policy.retrievePeriod(sPeriod.PolicyNumber,java.util.Date.CurrentDate).PolicyTerm.CheckArchived)
    }
    else{
      return (sPeriod.Job.LatestPeriod.PolicyTerm.CheckArchived)
    }

  }
  /**
   * Return the list of un-withdrawn policies which are spun off from this policy.
   */
  static function filteredDividedPolicies(period : PolicyPeriod) : Policy[] {
    return period.Policy.DividedPolicies.
        where(\ p -> (p.BoundPeriods.length > 0 or
            (p.BoundPeriods.length == 0 and
                p.LatestPeriod.Status != PolicyPeriodStatus.TC_WITHDRAWN and
                p.LatestPeriod.Status != PolicyPeriodStatus.TC_DECLINED and
                p.LatestPeriod.Status != PolicyPeriodStatus.TC_NOTTAKEN)))
  }
}