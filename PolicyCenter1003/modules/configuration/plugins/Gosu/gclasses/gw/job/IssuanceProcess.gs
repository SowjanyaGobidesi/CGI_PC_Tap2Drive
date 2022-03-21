package gw.job

uses gw.api.intentionallogging.IntentionalLogger
uses gw.api.job.JobProcessLogger
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.forms.FormInferenceEngine
uses gw.job.permissions.IssuancePermissions
uses gw.pl.logging.LogMessageParams
uses org.slf4j.Marker
uses org.slf4j.MarkerFactory

/**
 * Encapsulates the actions taken within an Issuance Job.
 *
 * @see JobProcess for general information and job process logic.
 * @see gw.plugin.policyperiod.impl.JobProcessCreationPlugin
 */
@Export
class IssuanceProcess extends JobProcess {

  construct(period: PolicyPeriod) {
    super(period, new IssuancePermissions(period.Job))
    JobProcessEvaluator = JobProcessUWIssueEvaluator.forIssuance()
  }

  override property get Job(): Issuance {
    return super.Job as Issuance
  }

  private final var _marker : Marker as Marker = MarkerFactory.getMarker("IssuanceProcess")

  private final var _intentionalLogger : IntentionalLogger as IntentionalLogger = gw.api.intentionallogging.IntentionalLogger.from(PCLoggerCategory.JOB_PROCESS)

  // ===== LIFECYCLE FUNCTIONS =====

  /**
   * Initializes the issuance job.
   */
  override function start() {
    JobProcessLogger.logInfo("Starting issuance for branch: " + _branch)
    startJobAsNew()
    if (Job.ActivePeriods.Count == 1) {
      // logic for new issuance
      Job.assignRolesFromPolicy()
      _branch.expireNextChangeApprovals()
      _branch.expirePastDateApprovals()
    }
    beginEditing()
  }

  override function beginEditing() {
    super.beginEditing()
    _branch.Lines.each(\l -> l.onIssuanceBeginEditing())
  }

  /**
   * Indicates whether issuance can be saved -- yes, it always can.
   */
  function canSaveDraft(): boolean {
    return true
  }

  override protected function addJobSpecificStartQuoteProcessChecks(jobConditions: JobConditions): JobConditions {
    return jobConditions.checkCanStartQuoteProcessStatus()
  }

  /**
   * Checks the conditions for which we can start the process of issuing the policy period.
   */
  override function canIssue(operation: String): JobConditions {
    return canFinishIssue(super.canIssue(operation))
  }

  /**
   * Starts issuance for the policy period.  Complete issuance by invoking
   * {@link #finishIssuing} or {@link #failIssuing}.
   */
  function finishIssuing() {
    canIssue(DisplayKey.get("Job.Process.Issuance.FinishIssuing"))
        .checkJobNotComplete()
        .assertOkay()

    JobProcessLogger.logInfo("Finish issuing branch: " + _branch)
    prepareBranchForFinishingJob()
    _branch.Job.copyUsersFromJobToPolicy()
    createBillingEventMessages()
    if (_branch.hasScheduledFinalAudit()) {
      if (_branch.PeriodStart != _branch.BasedOn.PeriodStart or _branch.PeriodEnd != _branch.BasedOn.PeriodEnd) {
        _branch.removeScheduledFinalAudit()
        _branch.scheduleExpirationFinalAudit()
      }
    }
    _branch.rescheduleAuditSeries()
    _branch.Policy.markIssued(Date.Today)
    _branch.Policy.OriginalEffectiveDate = _branch.PeriodStart
    _branch.updatePolicyTermDepositAmount()
    startChecksFor(DisplayKey.get("Job.Process.Issuance.Issuing")).checkNoActivePeriods().assertOkay()

    try {
      _branch.promoteBranch(false)
    } catch (e: IllegalArgumentException) {
      // the following exception is hardcoded at platform level and as per PC-30436 we're making it translatable
      // preemption check is invoked for all jobs so, theoretically, can be thrown for any transaction
      if (e.Message == "Cannot promote preempted branch") {
        throw new DisplayableException(DisplayKey.get("Job.Error.Preempted"))
      }
      throw e
    }
    commitBranch("promote in issue")

    bindReinsurableRisks() // flags Activity on error...
    commitBranch("bind reinsurables in issue")

    JobProcessContextUpdater.updateContext(_branch)
    IntentionalLogger.logResult(
        Marker,
        "Operation completed",
        LogMessageParams.create()
            .put("result.outcome", BindOption.TC_BINDANDISSUE.Code)
            .put("result.value", _branch.EstimatedPremium)
    )
    JobProcessContextUpdater.clearContext()

    JobProcessLogger.logDebug("Finished issuing branch: " + _branch)
  }

  /**
   * Starts issuance for the policy period.  Complete issuance by invoking
   * {@link #finishIssuing} or {@link #failIssuing}.
   */
  function issue() {
    canIssue().assertOkay()
    _branch.AllAccountSyncables.each(\a -> a.prepareForPromote())

    JobProcessValidator.validatePeriodForUI(_branch, TC_READYFORISSUE)
    checkThatBasedOnPeriodNotArchivedInBillingSystem()
    JobProcessEvaluator.evaluateAndCheckForBlockingUWIssues(_branch, TC_BLOCKSISSUANCE)

    JobProcessLogger.logDebug("Issue branch: " + _branch)
    withdrawOtherActivePeriods()
    FormInferenceEngine.Instance.inferPreBindForms(_branch)
    _branch.Status = TC_BINDING

    _branch.bindAutoNumberSequences()
    _branch.updateEstimatedPremium()
    _branch.runSubmissionIssuanceLogic()

    // To make cancellation asynchronous, uncomment this event and remove the call to finishIssuing.
    // Whatever responds to the event needs to call finishIssuing() when it has finished so that
    // PolicyCenter can finish the process.

    //_branch.addEvent("IssueSubmission")
    finishIssuing()
  }

  override property get RecalculateDepositOnReportingAfterValidQuote(): boolean {
    return true
  }

  /**
   * Successfully completes issuance of a policy period.
   */
  override function createBillingEventMessages() {
    _branch.addEvent(PolicyPeriod.ISSUEPERIOD_EVENT)
  }

  /**
   * Fails issuance of policy period, set the status to "Review".
   */
  function failIssuing() {
    startChecksFor(DisplayKey.get("Job.Process.Issuance.FailingIssuing")).checkBranchNotLocked().assertOkay()
    Job.assignUnderwriter()
    Job.createProducerActivity(ActivityPattern.finder.getActivityPatternByCode("issue_failed"),
        DisplayKey.get("Issuance.IssuePolicy.Failed.Subject"),
        DisplayKey.get("Issuance.IssuePolicy.Failed.Description"))

    JobProcessContextUpdater.updateContext(_branch)
    IntentionalLogger.logFail(Marker, DisplayKey.get("Issuance.IssuePolicy.Failed.Subject"))
    JobProcessContextUpdater.clearContext()
  }

  /**
   * Check the conditions for which this policy period can be withdrawn.
   */
  override function canWithdraw(): JobConditions {
    return super.canWithdraw()
        .checkStatus(new PolicyPeriodStatus[]{TC_NEW, TC_DRAFT, TC_RATED, TC_QUOTED})
  }

  /**
   * Checks the conditions for which a search for data to copy into the policy can be started
   */
  override function canStartCopyPolicyData(): JobConditions {
    return internalCanStartCopyPolicyData()
  }

  override function issueJob(bindAndIssue: boolean) {
    if (not bindAndIssue) {
      throw new IllegalArgumentException("Bind-only not allowed for Issuance")
    }
    _branch.onBeginIssueJob()
    issue()
  }
}
