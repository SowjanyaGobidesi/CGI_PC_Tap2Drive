package gw.job

uses gw.api.locale.DisplayKey
uses gw.api.job.JobProcessLogger
uses gw.api.util.DisplayableException
uses gw.job.permissions.RewriteNewAccountPermissions
uses gw.forms.FormInferenceEngine
uses gw.plugin.messaging.BillingMessageTransport

uses java.lang.IllegalArgumentException
uses java.util.Date
uses gw.api.web.util.TransactionUtil
uses java.lang.Exception
uses gw.api.system.PCLoggerCategory

/**
 * Encapsulates the actions taken within a RewriteNewAccount job.
 *
 * @see JobProcess for general information and job process logic.
 * @see gw.plugin.policyperiod.impl.JobProcessCreationPlugin
 */
@Export
class RewriteNewAccountProcess extends NewTermProcess {

  construct(period : PolicyPeriod) {
    super(period, new RewriteNewAccountPermissions(period.Job))
    JobProcessEvaluator = JobProcessUWIssueEvaluator.forRewriteNewAccount()
  }

  override property get Job() : RewriteNewAccount {
    return super.Job as RewriteNewAccount
  }

  /**
   * Initializes a rewrite new account.
   */
  override function start() {
    JobProcessLogger.logInfo("Starting rewrite new account for branch: " + _branch)
    startJobAsDraft()
    _branch.LocationRisks.each(\elt -> elt.setDenormalizedFK())
    _branch.AllReinsurables.each(\ r -> r.remove())
    _branch.RIRiskVersionLists.each(\ r -> r.remove() )
    initializeProducers()
    syncProductModel()
    // assign team members at this point so that automatic assignments will work
    Job.assignRolesFromRewriteNewAccountPolicy()
    _branch.Policy.Account.makeActive()
  }

  /**
   * Rewrites the policy period.
   */
  function rewriteNewAccount() {
    canRewriteNewAccount().assertOkay()
    startBinding()
  }

  function startBinding() {
    _branch.AllAccountSyncables.each(\ a -> a.prepareForPromote())

    JobProcessValidator.validatePeriodForUI(_branch, TC_READYFORISSUE)
    checkThatBasedOnPeriodNotArchivedInBillingSystem()
    JobProcessEvaluator.evaluateAndCheckForBlockingUWIssues(_branch, TC_BLOCKSISSUANCE)

    try {
      TransactionUtil.runAtomically(\ bundle -> {
        withdrawOtherActivePeriods()  // check other activities...
        _branch.updateTermNumber()
        _branch.PolicyNumber = _branch.genNewPeriodPolicyNumber()
        _branch.Status = TC_BINDING
        _branch.ensureProducerOfService()
        _branch.ensureProducerOfRecord()
        _branch.bindAutoNumberSequences()
        _branch.updateEstimatedPremium()
        FormInferenceEngine.Instance.inferPreBindForms(_branch)
        finishRewriteNewAccount()}, _branch)
     } catch (e: Exception) {
      PCLoggerCategory.JOB_PROCESS.error("Unable to issueRewriteNewAccount", e)
      throw e
     }
  }

  /**
   * Finishes the rewriteNewAccount for the policy period.
   * As of 8.0.4, this no longer does it's own commit.  If calling from other than {@link RewriteNewAccountProcess#startBinding()},
   * you need to ensure the changes are committed.
   */
  function finishRewriteNewAccount() {
    JobProcessLogger.logInfo("Finishing rewriteNewAccount for branch: " + _branch)
    canFinishJob(DisplayKey.get("Job.Process.RewriteNewAccount.FinishRewrite"))
        .checkJobNotComplete()
        .checkOnlyActivePeriod()
        .assertOkay()
    _branch.properlySetTransactionFlags()
    Job.Policy.Account.markContactsForAutoSync()
    
    _branch.Job.copyUsersFromJobToPolicy()
    prepareBranchForFinishingJob()
    createBillingEventMessages()
    _branch.scheduleAllAudits()  // ? need to double check on this
    _branch.updatePolicyTermDepositAmount()
    _branch.PolicyTerm.Bound = true
    _branch.Policy.markIssued(Date.Today)

    bindReinsurableRisks() // flags Activity on error...
    _branch.Job.createCustomHistoryEvent(CustomHistoryType.TC_REWR_NEW_ACCT_BOUND, 
            \ -> DisplayKey.get("Job.RewriteNewAccount.History.TargetAccount.Description", _branch.PolicyNumber, _branch.Policy.RewrittenToNewAccountSource.Account))
    // promote has to be last, look at RenewalProcess
    try {
      _branch.promoteBranch(false)
    } catch (e : IllegalArgumentException) {
      // the following exception is hardcoded at platform level and as per PC-30436 we're making it translatable
      // preemption check is invoked for all jobs so, theoretically, can be thrown for any transaction
      if (e.Message == "Cannot promote preempted branch") {
        throw new DisplayableException(DisplayKey.get("Job.Error.Preempted"))
      }
      throw e
    }

  }

  function canRewriteNewAccount() : JobConditions {
    return canFinishIssue(canIssue(DisplayKey.get("Job.Process.RewriteNewAccount.RewriteNew")))
            .checkNotStatus(TC_BINDING)
  }

  override protected function addJobSpecificStartQuoteProcessChecks(jobConditions: JobConditions): JobConditions {
    return jobConditions.checkCanStartQuoteProcessStatus()
  }

  /**
   * Check the conditions for which this policy period can be withdrawn.
   */
  override function canWithdraw() : JobConditions {
    return super.canWithdraw()
            .checkStatus(new PolicyPeriodStatus[] { TC_DRAFT, TC_RATED, TC_QUOTED })
  }

  /**
   * Checks the conditions for which a search for data to copy into the policy can be started
   */
  override function canStartCopyPolicyData() : JobConditions {
    return internalCanStartCopyPolicyData()
  }

  // ===== LIFECYCLE FUNCTIONS =====

  override function createBillingEventMessages() {
     _branch.addEvent(PolicyPeriod.CREATEPERIOD_EVENT)
  }

  override function issueJob(bindAndIssue : boolean) {
    if (not bindAndIssue) {
      throw new IllegalArgumentException("Bind-only not allowed for RewriteNewAccount")
    }
    _branch.onBeginIssueJob()
    rewriteNewAccount()
  }

  /**
   * Remove RewrittenToNewAccount flag from old Policy.
   */
  override protected function withdrawWithoutCheckingConditions() {
    _branch.Policy.clearPolicyLinksForRewriteNewAccount()
    super.withdrawWithoutCheckingConditions()
  }
}
