package gw.web.job.policychange

uses gw.api.locale.DisplayKey

uses java.util.Date
uses pcf.api.Location

@Export
class StartPolicyChangeUIHelper {

  public static function getConfirmMessage(inForcePeriod : entity.PolicyPeriod, effectiveDate : Date) : String {
    var result = ""
    if (inForcePeriod != null) {
      if(inForcePeriod.Policy.isOOSChange(effectiveDate)){
        result = result + DisplayKey.get("Web.Job.OOS.VerifyOOSChange")
      }
      if(inForcePeriod.hasFinalAuditFinished()){
        result = result + DisplayKey.get("Web.Job.FinalAuditCompleted")
      }
    }
    return result
  }

  /**
   * Apply the EffectiveTimePlugin to initalize the time part of the EffectiveDate.
   * The EffectiveDate will be validated by PolicyPlugin.canStartPolicyChange()
   */
  public static function applyEffectiveTimePluginForPolicyChange( policyPeriod : entity.PolicyPeriod, job : entity.PolicyChange, effDate : Date ) : Date {
    var effDateTime = gw.api.job.EffectiveDateCalculator.instance().getPolicyChangeEffectiveDate(effDate, policyPeriod, job)
    if (effDateTime < policyPeriod.PeriodStart) {
      effDateTime = policyPeriod.PeriodStart
    } else if (effDateTime >= policyPeriod.PeriodEnd) {
      effDateTime = policyPeriod.PeriodEnd.addMinutes(-1)
    }
    return effDateTime
  }


  /**
   * Returns a string with applicable warnings when starting a policy change. These warnings will not
   * prevent the policy change from starting. The string may be empty.
   */
  public static function getPolicyChangeWarningMessage(pInForcePeriod: PolicyPeriod, pEffectiveDate: Date) : String {
    var messages = new java.util.ArrayList<String>()
    if (pInForcePeriod != null) {
      if (!pInForcePeriod.Policy.Issued) {
        messages.add(DisplayKey.get("Web.Job.ChangeNonIssuedPolicy"))
      }
      if ( pInForcePeriod.Canceled ) {
        var cancellationDate = pInForcePeriod.CancellationDate.format("short")
        messages.add(DisplayKey.get("Web.Job.PolicyIsCanceledAsOf", cancellationDate))
      }
      if(pInForcePeriod.Policy.hasOpenPolicyChangeJob()) {
        messages.add(DisplayKey.get("Web.PolicyChange.MayResultInPreemption"))
      }
      if ( pInForcePeriod.Policy.RewrittenToNewAccountDestination != null){
        messages.add(DisplayKey.get("Web.Job.ChangeRewriteNewAccountPolicy", pInForcePeriod.Policy.RewrittenToNewAccountDestination.LatestBoundPeriod.PolicyNumber))
      }
    }

    return messages.Empty ? null : messages.join(", ")
  }

  /**
   * Gets the in-force period of {@code policyPeriod} that is effective as of {@code effectiveDate}.
   */
  public static function getInForcePeriodWithBasedOn(policyPeriod : PolicyPeriod, effectiveDate : Date) : PolicyPeriod {
    return (effectiveDate != null) ? Policy.finder.findPolicyPeriodByPolicyAndAsOfDate(policyPeriod.Policy, effectiveDate) : null
  }

  /**
   * Refreshes the in-force period so that the policy change does not rely on a cached version. Then, attempts to start
   * the policy change job and commit. Returns {@code true} if the job was successfully started.
   */
  public static function refreshAndStartJobAndCommit(job : PolicyChange, policyPeriod : PolicyPeriod, effectiveDate : Date, location : Location) : boolean {
    // see PC-26271 for why it is necessary to get the latest policy period from the database
    var period = getUpdatedPolicyPeriod(policyPeriod)
    var inForcePeriod = getInForcePeriodWithBasedOn(period, effectiveDate) ?: period
    var inForceEffectiveDate = applyEffectiveTimePluginForPolicyChange(inForcePeriod, job, effectiveDate)
    return job.startJobAndCommit(inForcePeriod.Policy, inForceEffectiveDate, location)
  }

  /**
   * Get the most up-to-date version of {@code policyPeriod} from the database.
   */
  static function getUpdatedPolicyPeriod(policyPeriod : PolicyPeriod) : PolicyPeriod {
    var q = gw.api.database.Query.make(entity.PolicyPeriod)
    q.compare("Policy", Equals, policyPeriod.Policy.ID)
    var result = q.select()
    return result.FirstResult
  }
}