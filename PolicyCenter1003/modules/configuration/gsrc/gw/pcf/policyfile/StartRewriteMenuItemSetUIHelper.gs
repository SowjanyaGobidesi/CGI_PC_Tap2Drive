package gw.pcf.policyfile

uses gw.api.locale.DisplayKey
uses gw.util.concurrent.LockingLazyVar
uses pcf.api.Location
uses pcf.JobForward
uses java.util.Date
uses gw.api.upgrade.Coercions

@Export
class StartRewriteMenuItemSetUIHelper {

  var _period : PolicyPeriod as Period
  var _hasFutureRenewals : LockingLazyVar as HasFutureRenewals

  construct(policyPeriod : PolicyPeriod) {
    _period = policyPeriod
    _hasFutureRenewals = gw.util.concurrent.LockingLazyVar.make(\ -> getInForcePeriod().hasFutureRenewals())
  }

  function getInForcePeriod(): PolicyPeriod {
    var inForce = Period.CancellationDate != null ?
        Policy.finder.findPolicyPeriodByPolicyAndAsOfDate(Period.Policy, Period.CancellationDate) : null
    return inForce
  }

  function startRewrite(rewriteType : RewriteType, inForcePeriod : PolicyPeriod, CurrentLocation : Location) {
    var expirationDate = computeTermEnd(rewriteType, inForcePeriod)
    var job = new Rewrite() {:RewriteType = rewriteType}
    if (job.startJobAndCommit(inForcePeriod.Policy, inForcePeriod.CancellationDate, expirationDate, CurrentLocation)) {
      JobForward.go(job, job.Periods[0])
    }
  }

  function getRewriteMessage(inForcePeriod : PolicyPeriod) : String {
    var result = ""
    if(inForcePeriod.Policy.isOOSChange(inForcePeriod.CancellationDate)){
      result = result + DisplayKey.get("Web.Rewrite.OOSEMessage")
    }
    if(inForcePeriod.hasFinalAuditFinished()){
      result = result + DisplayKey.get("Web.Job.FinalAuditCompleted")
    }
    if (Coercions.makePBooleanFrom(HasFutureRenewals.get())) {
      result = result + DisplayKey.get("Web.Job.FuturePeriodExists")
    }
    return result
  }

  function computeTermEnd(rewriteType: typekey.RewriteType, inForcePeriod : PolicyPeriod): Date {
    if (rewriteType == TC_REWRITENEWTERM) {
      var plugin = gw.plugin.Plugins.get(gw.plugin.policyperiod.IPolicyTermPlugin)
      return plugin.calculatePeriodEnd(inForcePeriod.CancellationDate, inForcePeriod.Policy.Product.DefaultTermType, inForcePeriod)
    } else {
      return inForcePeriod.PeriodEnd
    }
  }

  function CanRewrite(assertPeriod(period : PolicyPeriod) : boolean,
                      rewriteType: typekey.RewriteType,
                      inForcePeriod : PolicyPeriod) : boolean {

    return inForcePeriod != null
        and isNotCanceledLocked(inForcePeriod)
        and inForcePeriod.CancellationDate != null
        and assertPeriod(inForcePeriod)
        and inForcePeriod.Policy.canStartRewrite(inForcePeriod.CancellationDate,
                                                  computeTermEnd(rewriteType, inForcePeriod)) == null
  }

  function isNotCanceledLocked(inForcePeriod : PolicyPeriod) : boolean {
    return not inForcePeriod.isRewrittenToNewAccountAndCanceledLocked()
  }

  function CanRewriteFullTerm(inForcePeriod : PolicyPeriod): boolean {
    return CanRewrite(\ p -> p.CancellationDate == p.PeriodStart, TC_REWRITEFULLTERM, inForcePeriod)
  }

  function CanRewriteRemainderOfTermTerm(inForcePeriod : PolicyPeriod): boolean {
    return CanRewrite(\ p -> p.CancellationDate != p.PeriodStart, TC_REWRITEREMAINDEROFTERM, inForcePeriod)
  }

  function canRewriteNewTerm(inForcePeriod : PolicyPeriod): boolean {
    return CanRewrite(\ p -> p.CancellationDate != p.PeriodStart, TC_REWRITENEWTERM, inForcePeriod)
  }
}