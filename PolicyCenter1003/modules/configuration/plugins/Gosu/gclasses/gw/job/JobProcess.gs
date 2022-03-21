package gw.job

uses com.guidewire.commons.entity.type.ThreadLocalBundleProvider
uses com.guidewire.pc.util.PermissionUtil
uses com.guidewire.pl.system.dependency.PLDependencies
uses entity.Job
uses entity.PolicyLine
uses gw.api.diff.DiffItem
uses gw.api.intentionallogging.IntentionalLogger
uses gw.api.job.JobProcessLogger
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.AvailabilityContextScope
uses gw.api.profiler.PCProfilerTag
uses gw.api.profiler.Profiler
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.api.system.PLDependenciesGateway
uses gw.api.system.bundle.PCNeverPersistedBundle
uses gw.api.util.DisplayableException
uses gw.api.web.job.JobWizardHelper
uses gw.api.web.productmodel.ProductModelSyncIssue
uses gw.assignment.AssignmentUtil
uses gw.internal.ext.org.apache.commons.collections.keyvalue.MultiKey
uses gw.job.permissions.CombinedPermissionPolicies
uses gw.pl.logging.LogMessageParams
uses gw.pl.persistence.core.Bundle
uses gw.pl.persistence.core.Key
uses gw.plugin.Plugins
uses gw.plugin.billing.BillingPaymentsPreview
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.billing.PaymentPlanData
uses gw.plugin.diff.IPolicyPeriodDiffPlugin
uses gw.plugin.reinsurance.IReinsurancePlugin
uses gw.quoting.async.AsyncQuotingJobProcessValidator
uses gw.rating.CostOverrideValidation
uses gw.web.productmodel.ProductModelSyncIssueWrapper
uses org.slf4j.Marker
uses org.slf4j.MarkerFactory

uses java.util.concurrent.Callable
uses java.util.concurrent.ExecutionException
uses java.util.concurrent.ForkJoinPool
uses java.util.concurrent.ForkJoinTask
uses java.util.concurrent.ForkJoinWorkerThread
uses java.util.concurrent.TimeUnit
uses java.util.concurrent.TimeoutException
uses java.util.concurrent.atomic.AtomicInteger

/**
 * JobProcess classes encapsulate all of the actions that can be taken in the context of a Job.
 * This base class provides support for actions that are common across all or many of the jobs.
 * <p>
 * The JobProcess is associated with a specific policy period and its related job.  Validation is quite
 * an extensive task and JobProcessValidator encapsulates the ways in which validation can happen.
 * JobProcessEvaluator encapsulates the interaction with the Underwriting Authority feature.
 * <p>
 * <b>Note:</b> The JobProcess classes involve complex logic that is extremely sensitive to
 * modification.  To implement changes to out-of-the-box logic, one approach is to subclass the
 * existing JobProcess class and override methods as needed.  Use JobProcessCreationPlugin to construct
 * a different implementation.  This approach preserves the original logic for reference.  As of the 4.0.2
 * maintenance release, the JobProcess classes are exported, so another approach is to modify the
 * classes directly.  In either case, proceed with caution.  Seemingly small changes can break the jobs.
 * <p>
 * Typically, methods are named by the action that they take, e.g., edit, requestQuote, withdraw.
 * Often an additional "can" method accompanies the action method -- e.g., canEdit, canRequestQuote,
 * canWithdraw -- allowing a single place to check that current conditions allow the action. The
 * "can" methods are useful in PCFs for determining the state of widget properties, such as visibility.
 * The "can" methods work with JobCondition and return an instance that holds information about problems
 * that prevent the associated action from taking place.
 * <p>
 * Many hooks are written into the JobProcesses to allow certain kinds of custom logic to occur at
 * safe points.  Abstract functions require some sort of logic (even if the logic is a no-op) from
 * subclasses.  Other hooks are more subtle but should be evident from code comments.
 * <p>
 * In particular, there are a number of points where processing may occur on another
 * system.  Out of the box, the JobProcesses are written synchronously for simplicity.  (We try to keep it
 * simple. Some things just aren't.)  It may be that certain processing is done by external
 * systems, and making users wait for the response may be inappropriate.  There are comments
 * in the code about how to use events to make job processes work asynchronously as appropriate.
 * The existence of a "finish" method is an indication of where asynchronous process is supported
 * without too much configuration work.  For example, in a submission the bind process starts with
 * the bind() method and ends with the finishBind() method, providing an opportunity for additional
 * processing in between.
 *
 * @see gw.plugin.policyperiod.impl.JobProcessCreationPlugin
 * @see JobConditions
 */
@Export
abstract class JobProcess implements gw.job.IJobProcess {

  protected var _branch: PolicyPeriod

  protected var _validator: JobProcessValidator as JobProcessValidator = new JobProcessValidator()
  protected var _asyncValidator: JobProcessValidator as AsyncJobProcessValidator = new AsyncQuotingJobProcessValidator()
  protected var _evaluator: JobProcessUWIssueEvaluator as JobProcessEvaluator = new JobProcessUWIssueEvaluator()
  protected var _jobTypePermissions: JobTypePermissions as Permissions
  private var _automatedProcess = false

  private final var _marker: Marker as Marker = MarkerFactory.getMarker("AbstractJobProcess")
  private final var _intentionalLogger: IntentionalLogger as IntentionalLogger = IntentionalLogger.MUTED

  var _isQuoting: boolean as readonly IsQuoting = false

  var _beanCache: WeakHashMap<MultiKey, Object> as BeanCache = {}

  private static final var _threadPoolNumber = new AtomicInteger(1)

  /**
   * Constructor
   *
   * @param period                     The PolicyPeriod that the job process is for
   * @param jobSpecificTypePermissions Wraps permissions for the current job
   */
  construct(period: PolicyPeriod, jobSpecificTypePermissions: JobTypePermissions) {
    if (period == null) {
      throw "Period is null. Job Process classes cannot function correctly without a period."
    }
    if (jobSpecificTypePermissions == null) {
      throw "JobTypePermissions is null. Job Process classes cannot function correctly" +
          "without access to permissions data."
    }
    _branch = period
    _jobTypePermissions = new CombinedPermissionPolicies(jobSpecificTypePermissions, period)
  }

  property get Job(): Job {
    return _branch.Job
  }

  /**
   * Returns whether two-step quoting is available for this job process.
   * This will only be used in the UI level, which means with builder you should always be able
   * to create a rated policy period, regardless what value this method returns.
   */
  property get TwoStepQuotingAvailable(): boolean {
    return true
  }

  /**
   * Quoting is encapsulated in its own process class, making it easier to modify and extend
   * what happens to generate a quote.
   */
  protected property get QuoteProcess(): QuoteProcess {
    return new QuoteProcess(this)
  }
  /**
   * Checks the conditions for which the lock can be released.
   */
  function canReleaseLock(): boolean {
    return _branch.EditLocked and perm.System.editlockoverride and (not _branch.hasAnyUnhandledPreemptions())
  }

  /**
   * Cancels open activities on the Job associated with this process.  This is
   * slightly more than a convenience method since although the same function is
   * available on Job, this overrides any edit permissions on the activities.
   * <p>
   * Executes as SuperUser since the current user may be neither an assigner nor an assignee.
   */
  function cancelOpenActivities() {
    executeAsSuperUser(\-> Job.cancelOpenActivities())
  }

  //================================================================================
  // Lifecycle Functions
  //================================================================================

  /**
   * Creates a new JobConditions instance for the given operation against
   * the policy period associated with this JobProcess instance.
   *
   * @param operation name of the operation for which checks are being run
   */
  protected function startChecksFor(operation: String): JobConditions {
    return new JobConditions(_branch, operation)
  }

  /**
   * Initiates Job the with status of "New".
   */
  protected function startJobAsNew() {
    startJobWithStatus(TC_NEW)
  }

  /**
   * Initiates Job the with status of "Draft".
   */
  protected function startJobAsDraft() {
    startJobWithStatus(TC_DRAFT)
  }

  /**
   * Initiates Job the with the given status.
   */
  private function startJobWithStatus(status: PolicyPeriodStatus) {
    JobProcessContextUpdater.updateContext(_branch)
    IntentionalLogger.logStart(Marker)
    JobProcessContextUpdater.clearContext()

    canStartJob().assertOkay()
    JobProcessLogger.logInfo("Starting " + Job.DisplayType + " job with status: " + status)
    _branch.WrittenDate = this.DefaultWrittenDate
    _branch.Status = status
    _branch.EditLocked = false
    _branch.QuoteHidden = false
    _branch.markInvalidQuote()
    _branch.AllAccountSyncables.each(\a -> a.prepareForJobStart())
  }

  /**
   * Returns the default written date to use for this job.
   */
  protected property get DefaultWrittenDate(): Date {
    return Date.CurrentDate
  }

  /**
   * Runs checks that conditions are right to start the job.
   */
  protected function canStartJob(): JobConditions {
    return canStartJob(DisplayKey.get("Job.Process.StartJob"))
  }

  protected function canStartJob(operation: String): JobConditions {
    return startChecksFor(operation)
        .checkBranchNotLocked()
        .checkNotQuoted()
  }

  protected function canFinishJob(operation: String): JobConditions {
    return startChecksFor(operation)
        .checkBranchNotLocked()
        .checkQuoteIsValid()
  }

  /**
   * The status states from which the policy period can be switched into edit mode ("Draft" status).
   * There is an Edit button on the UI that allows the user to switch to edit mode.  This
   * button will only be enabled when the policy period status is one of the statuses returned
   * by this method.  Some processes may have custom statuses from which editing may be allowed.
   * Since asynchronous quoting doesn't lock the UI, TC_QUOTING is not allowed.
   * During synchronous quoting, the UI is locked and it's not possible for the UI to be refreshed,
   * so the issue of the button becoming available does not arise.
   */
  protected property get AllowedEditStatus(): PolicyPeriodStatus[] {
    return {TC_RATED, TC_QUOTED}
  }

  /**
   * The status states from which the policy period can be expired
   */
  protected property get AllowedExpireStatus(): PolicyPeriodStatus[] {
    return {TC_NEW, TC_DRAFT, TC_RATED, TC_QUOTED}
  }

  /**
   * Checks the conditions for which the policy period can be switched
   * to edit mode ("Draft" status).
   */
  function canEdit(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.Edit"))
        .checkBranchNotLocked()
        .checkStatus(AllowedEditStatus)
        .checkEditPermission()
        .checkNoUnhandledPreemptions()
  }

  protected function canPromoteToDraft(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.BeginEditing"))
        .checkBranchNotLocked()
        .checkEditPermission()
        .checkNew()
  }

  /**
   * Switches the policy period to edit mode.
   */
  function edit() {
    canEdit().assertOkay()
    JobProcessLogger.logInfo("Editing branch: " + _branch)
    _branch.edit()
  }

  /**
   * Moves a policy from "New" to "Draft" status.
   */
  function beginEditing() {
    canPromoteToDraft().assertOkay()
    JobProcessLogger.logDebug("Begin editing branch: " + _branch)

    _branch.edit()

    _branch.runSegmentationRules()
    _branch.autoSelectUWCompany()
  }

  /**
   * Return {@link JobConditions} that is Okay=True if a user can
   * <ul>
   * <li>Access the Change Edit Effective Date Page</li>
   * <li>Other conditions required for the operation are available.</li>
   * </ul>
   */
  function canStartChangeEditEffectiveDate(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.ChangeEditEffectiveDate"))
        .check(false, "Unsupported operation")
  }

  /**
   * Checks if the JobProcess can legally change its effective date to be {@link newEffectiveDate}
   */
  function canFinishChangeEditEffectiveDate(newEffectiveDate: Date): JobConditions {
    return canStartChangeEditEffectiveDate()
        .check(false, "Unsupported operation")
  }

  /**
   * Checks the conditions for which the policy period can be rated.
   */
  function canRequestRate(): JobConditions {
    var startQuoteProcessJobConditions = startChecksFor(DisplayKey.get("Job.Process.Rate"))
    var jobConditions = addStartQuoteProcessChecks(startQuoteProcessJobConditions)
    return addJobSpecificStartQuoteProcessChecks(jobConditions)
        .checkNotRated()
  }

  /**
   * Checks the conditions for which the policy period can be quoted after a rating
   */
  function canRequestPostRatingQuote(): JobConditions {
    var startPostRatingQuoteProcessJobConditions = startChecksFor(DisplayKey.get("Job.Process.PostRatingQuote"))
    return addStartQuoteProcessChecks(startPostRatingQuoteProcessJobConditions).checkRateIsValid()
  }

  /**
   * Checks the conditions for which the policy period can be quoted.
   */
  function canRequestQuote(): JobConditions {
    var startQuoteProcessJobConditions = startChecksFor(DisplayKey.get("Job.Process.Quote"))
    var jobConditions = addStartQuoteProcessChecks(startQuoteProcessJobConditions)
    return addJobSpecificStartQuoteProcessChecks(jobConditions)
  }

  protected function addJobSpecificStartQuoteProcessChecks(jobConditions: JobConditions): JobConditions {
    return jobConditions
  }

  private function addStartQuoteProcessChecks(jobConditions: JobConditions): JobConditions {
    return jobConditions
        .checkQuotePermission()
        .checkNotQuoted()
        .checkJobNotComplete()
        .checkNoUnhandledPreemptions()
        .checkBranchNotLocked()
        .checkAdvancePermission()
  }

  /**
   * Checks the conditions for which the policy period can be rated asynchronously.
   */
  function canRequestAsyncRate(): JobConditions {
    return canStartAsyncQuoteProcess(canRequestRate())
  }

  /**
   * Checks the conditions for which the policy period can be quoted asynchronously.
   */
  function canRequestAsyncQuote(): JobConditions {
    return canStartAsyncQuoteProcess(canRequestQuote())
  }

  private function canStartAsyncQuoteProcess(precondition: JobConditions): JobConditions {
    return precondition
        .check(PCConfigParameters.AsynchronousQuotingEnabled.Value, "'AsynchronousQuotingEnabled' is false")
        .check(not Job.SideBySide, "Doesn't support async rate/quote for side-by-side job")
  }

  /**
   * Attempts to generate a quote.
   */
  function requestQuote() {
    requestQuote(null as JobWizardHelper, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, true)
  }

  /**
   * Attempts to generate a quote.
   *
   * @param jobProcessValidator the job validator
   */
  function requestQuote(jobProcessValidator: JobProcessValidator) {
    requestQuote(null as JobWizardHelper, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, false, jobProcessValidator)
  }

  /**
   * Attempts to generate a quote, using the specified job wizard helper to
   * use for error reporting purposes. Calls through to the QuoteProcess instance.
   *
   * @param jobWizardHelper a helper used to add UI messages
   */
  function requestQuote(jobWizardHelper: JobWizardHelper) {
    requestQuote(jobWizardHelper, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, true)
  }

  /**
   * Attempts to generate a quote.
   *
   * @param valLevel    the validation level used for validation before quoting
   * @param ratingStyle the metadata passed on for use by the rating engine
   */
  function requestQuote(valLevel: ValidationLevel, ratingStyle: RatingStyle) {
    requestQuote(null, valLevel, ratingStyle, true)
  }

  /**
   * Attempts to generate a quote.
   *
   * @param jobWizardHelper a helper used to add UI messages
   * @param valLevel        the validation level used for validation before quoting
   * @param ratingStyle     the metadata passed on for use by the rating engine
   */
  function requestQuote(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle) {
    requestQuote(jobWizardHelper, valLevel, ratingStyle, true)
  }

  /**
   * Attempts to generate a quote.
   *
   * @param jobWizardHelper        a helper used to add UI messages
   * @param valLevel               the validation level used for validation before quoting
   * @param ratingStyle            the metadata passed on for use by the rating engine
   * @param warningsThrowException if true, warnings throw validation exceptions
   */
  override function requestQuote(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle, warningsThrowException: boolean) {
    requestQuote(jobWizardHelper, valLevel, ratingStyle, warningsThrowException, JobProcessValidator)
  }

  /**
   * Attempts to generate a quote.
   *
   * @param jobWizardHelper        a helper used to add UI messages
   * @param valLevel               the validation level used for validation before quoting
   * @param ratingStyle            the metadata passed on for use by the rating engine
   * @param warningsThrowException if true, warnings throw validation exceptions
   * @param jobProcessValidator    the job validator
   */
  function requestQuote(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle, warningsThrowException: boolean, jobProcessValidator: JobProcessValidator) {
    PCProfilerTag.JOB_CLEAR_ASYNC_QUOTE_ISSUES.execute(\-> clearAllAsyncQuoteIssues())
    PCProfilerTag.JOB_PRE_QUOTE.execute(\-> runPreQuote())
    try {
      _isQuoting = true
      BeanCache.clear()
      PCProfilerTag.JOB_CHECK_CAN_QUOTE.execute(\-> canRequestQuote().assertOkay())
      var quoteProcess = new QuoteProcess(this, jobProcessValidator)

      JobProcessContextUpdater.updateContext(_branch)
      PCProfilerTag.JOB_REQUEST_QUOTE.execute(\-> quoteProcess.requestQuote(jobWizardHelper, valLevel, ratingStyle, warningsThrowException))
    } finally {
      JobProcessContextUpdater.clearContext()
      _isQuoting = false
      BeanCache.clear()
    }
  }

  /**
   * Attempts to generate a rate. Calling request rate will run the quote process up to and including rating,
   * deferring the post-rating steps to a later time. This can be useful for situations where you need to price
   * a policy but not necessarily have it ready to be bound.
   */
  function requestRate() {
    requestRate(null as JobWizardHelper, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, true)
  }

  /**
   * Attempts to generate a rate. Calling request rate will run the quote process up to and including rating,
   * deferring the post-rating steps to a later time. This can be useful for situations where you need to price
   * a policy but not necessarily have it ready to be bound.
   *
   * @param jobProcessValidator the job validator
   */
  function requestRate(jobProcessValidator: JobProcessValidator) {
    requestRate(null as JobWizardHelper, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, false, jobProcessValidator)
  }

  /**
   * Attempts to generate a rate, using the specified job wizard helper to use for error reporting purposes.
   * <p>
   * Calling request rate will run the quote process up to and including rating, deferring the post-rating steps
   * to a later time. This can be useful for situations where you need to price a policy but not necessarily have
   * it ready to be bound.
   *
   * @param jobWizardHelper a helper used to add UI messages
   */
  function requestRate(jobWizardHelper: JobWizardHelper) {
    requestRate(jobWizardHelper, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, true)
  }

  /**
   * Attempts to generate a rate. Calling request rate will run the quote process up to and including rating,
   * deferring the post-rating steps to a later time. This can be useful for situations where you need to price
   * a policy but not necessarily have it ready to be bound.
   *
   * @param valLevel    the validation level used for validation before quoting
   * @param ratingStyle the metadata passed on for use by the rating engine
   */
  function requestRate(valLevel: ValidationLevel, ratingStyle: RatingStyle) {
    requestRate(null, valLevel, ratingStyle, true)
  }

  /**
   * Attempts to generate a rate. Calling request rate will run the quote process up to and including rating,
   * deferring the post-rating steps to a later time. This can be useful for situations where you need to price
   * a policy but not necessarily have it ready to be bound.
   *
   * @param jobWizardHelper a helper used to add UI messages
   * @param valLevel        the validation level used for validation before quoting
   * @param ratingStyle     the metadata passed on for use by the rating engine
   */
  function requestRate(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle) {
    requestRate(jobWizardHelper, valLevel, ratingStyle, true)
  }

  /**
   * Attempts to generate a rate. Calling request rate will run the quote process up to and including rating,
   * deferring the post-rating steps to a later time. This can be useful for situations where you need to price
   * a policy but not necessarily have it ready to be bound.
   *
   * @param jobWizardHelper        a helper used to add UI messages
   * @param valLevel               the validation level used for validation before quoting
   * @param ratingStyle            the metadata passed on for use by the rating engine
   * @param warningsThrowException if true, warnings throw validation exceptions
   */
  override function requestRate(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle, warningsThrowException: boolean) {
    requestRate(jobWizardHelper, valLevel, ratingStyle, warningsThrowException, JobProcessValidator)
  }

  /**
   * Attempts to generate a rate. Calling request rate will run the quote process up to and including rating,
   * deferring the post-rating steps to a later time. This can be useful for situations where you need to price
   * a policy but not necessarily have it ready to be bound.
   *
   * @param jobWizardHelper        a helper used to add UI messages
   * @param valLevel               the validation level used for validation before quoting
   * @param ratingStyle            the metadata passed on for use by the rating engine
   * @param warningsThrowException if true, warnings throw validation exceptions
   * @param jobProcessValidator    the job validator
   */
  function requestRate(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle,
                       warningsThrowException: boolean, jobProcessValidator: JobProcessValidator) {
    PCProfilerTag.JOB_CLEAR_ASYNC_QUOTE_ISSUES.execute(\-> clearAllAsyncQuoteIssues())
    PCProfilerTag.JOB_PRE_QUOTE.execute(\-> runPreQuote())
    try {
      _isQuoting = true
      BeanCache.clear()
      PCProfilerTag.JOB_CHECK_CAN_RATE.execute(\-> canRequestRate().assertOkay())
      var quoteProcess = new QuoteProcess(this, jobProcessValidator)
      JobProcessContextUpdater.updateContext(_branch)
      PCProfilerTag.JOB_REQUEST_RATE.execute(\-> quoteProcess.requestRate(jobWizardHelper, valLevel, ratingStyle, warningsThrowException))
    } finally {
      JobProcessContextUpdater.clearContext()
      _isQuoting = false
      BeanCache.clear()
    }
  }

  /**
   * Attempts to convert a rated policy into a bindable policy.
   */
  function requestPostRatingQuote() {
    requestPostRatingQuote(null as JobWizardHelper)
  }

  /**
   * Attempts to convert a rated policy into a bindable policy.
   *
   * @param jobWizardHelper Passed on to requestPostRatingQuote
   */
  override function requestPostRatingQuote(jobWizardHelper: JobWizardHelper) {
    try {
      _isQuoting = true
      BeanCache.clear()
      PCProfilerTag.JOB_CHECK_CAN_POSTRATINGQUOTE.execute(\-> canRequestPostRatingQuote().assertOkay())
      var quoteProcess = new QuoteProcess(this)
      JobProcessContextUpdater.updateContext(_branch)
      PCProfilerTag.JOB_REQUEST_POST_RATING_QUOTE.execute(\-> quoteProcess.requestPostRatingQuote(jobWizardHelper))
    } finally {
      JobProcessContextUpdater.clearContext()
      _isQuoting = false
      BeanCache.clear()
    }
  }

  /**
   * Attempts to override the rate for a specific line. Once finished, the policy will be put back into the same status.
   *
   * @param line The line you want to override the rate
   */
  function requestRatingOverride(line: PolicyLine) {
    requestRatingOverride(line, null)
  }

  /**
   * Attempts to override the rate for a specific line. Once finished, the policy will be put back into the same status.
   *
   * @param line            The line you want to override the rate
   * @param jobWizardHelper a helper used to add UI messages
   */
  function requestRatingOverride(line: PolicyLine, jobWizardHelper: JobWizardHelper) {
    var existingStatus = _branch.Status
    var costs = line.Costs
    costs.each(\cost -> {
      cost.storeOverrideAmountsFromBillingOverrideAmounts()
      cost.possiblyClearOverrideReason()
    })
    CostOverrideValidation.validateHasSingleOverridePerCost(costs)
    edit()
    // TODO: If we want to enable this for the other jobs, refactor this condition checking
    if (this typeis SubmissionProcess && existingStatus == TC_RATED) {
      requestRate(jobWizardHelper)
    } else {
      requestQuote(jobWizardHelper)
    }
  }

  /**
   * clear asyncQuoteIssues on the period once the period is in
   * terminal state (BOUND, ISSUED, WITHDRAWN, EXPIRED, RENEWED etc)
   */
  protected function clearAllAsyncQuoteIssues() {
    _branch.clearAllAsyncQuoteIssues()
  }

  /**
   * Return {@link JobConditions} that is Okay=True if a user can
   * Access the Copy Policy Data Search Page
   */
  function canStartCopyPolicyData(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.CopyData"))
        .check(false, "Unsupported operation")
  }

  protected function internalCanStartCopyPolicyData(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.CopyData"))
        .checkDraft()
        .checkNotPromoted()
        .checkNotQuickQuote()
        .checkNotUWLocked()
        .checkCondition(this._branch.JobProcess.Permissions.Edit, DisplayKey.get("Web.Job.Warning.LacksEditPermissionForVersion", this._branch.BranchName))
        .checkPermission(Permissions.CopyPolicyData)
  }

  /**
   * Indicates whether or not the current user can view the policy quote
   */
  function canViewQuote(): boolean {
    return _branch.ValidRate and (not _branch.QuoteHidden or perm.System.quotehideoverride)
  }

  /**
   * Indicates whether or not the current user can view the policy forms
   */
  function canViewForms(): boolean {
    return _branch.ValidQuote and (not _branch.QuoteHidden or perm.System.quotehideoverride)
  }

  /**
   * Indicates whether or not the current user can view the policy billing information
   */
  function canViewBillingInfo(): boolean {
    return _branch.ValidQuote and (not _branch.QuoteHidden or perm.System.quotehideoverride)
  }

  /**
   * Checks the conditions for which a new version of the policy period can be created.
   */
  function canMakeNewVersion(): JobConditions {
    var jobConditions = startChecksFor(DisplayKey.get("Job.Process.MakeNewVersion"))

    jobConditions.checkPermission(Permissions.Create)
    if (Job.SideBySide) {
      jobConditions.checkNotMaxSideBySideQuotes()
    } else {
      jobConditions.checkRateIsValid()
      jobConditions.checkNotMaxQuotes()
    }
    jobConditions.checkBranchNotLocked()
    jobConditions.checkNoUnhandledPreemptions()

    return jobConditions
  }

  /**
   * Checks the conditions for which the binding process of a policy period can be started.
   */
  function canBind(): JobConditions {
    return canBind(DisplayKey.get("Job.Process.Bind"))
  }

  /**
   * Checks the conditions for which the binding process of a policy period can be started.
   */
  function canBind(operation: String): JobConditions {
    return startChecksFor(operation)
        .checkBranchNotLocked()
        .checkAdvancePermission()
        .checkNoUnhandledPreemptions()
        .checkNoFutureTermsArchived()
        .checkPermission(Permissions.Bind)
  }

  protected function canFinishBind(): JobConditions {
    return canFinishBind(startChecksFor(DisplayKey.get("Job.Process.FinishBinding")))
  }

  protected function canFinishBind(jobConditions: JobConditions): JobConditions {
    return jobConditions
        .checkQuoteIsValid()
  }

  protected function canFailBind(): JobConditions {
    return canFailBind(DisplayKey.get("Job.Process.FailBind"))
  }

  // The conditions for failing issuing are the same as for binding
  protected function canFailIssue(): JobConditions {
    return canFailBind(DisplayKey.get("Job.Process.FailIssue"))
  }

  protected function canFailBind(operation: String): JobConditions {
    return startChecksFor(operation)
        .checkBranchNotLocked()
  }

  /**
   * Checks the conditions for which the policy period can be bound.
   */
  function canIssue(): JobConditions {
    return canIssue(DisplayKey.get("Job.Process.Issue"))
  }

  /**
   * Checks the conditions for which the PolicyPeriod can be issued
   *
   * @param operation name of the operation for which checks are being run
   */
  function canIssue(operation: String): JobConditions {
    return startChecksFor(operation)
        .checkBranchNotLocked()
        .checkQuoteIsValid()
        .checkAdvancePermission()
        .checkNoUnhandledPreemptions()
        .checkNoFutureTermsArchived()
        .checkPermission(Permissions.Bind)
        .checkPermission(Permissions.Issue)
  }

  protected function canFinishIssue(jobConditions: JobConditions): JobConditions {
    return jobConditions
        .checkNoUnhandledPreemptions()
        .checkOnlyActivePeriod()
  }

  function bind() {
    throw "This process does not support bind(). Look for another method."
  }

  /**
   * Gets the job specific activity pattern for UW review activity
   * see ActivityPatternEnhancement
   */
  protected property get UWReviewActivityPattern(): ActivityPattern {
    return ActivityPattern.finder.getActivityPatternByCode("approve_general")
  }

  /**
   * Puts policy period in underwriter review.
   */
  function review() {
    startChecksFor(DisplayKey.get("Job.Process.Review")).checkBranchNotLocked().assertOkay()
    Job.assignUnderwriter()
    Job.cancelOpenActivitiesForCategory(TC_UWREVIEW)
    Job.createRoleActivity(TC_UNDERWRITER, UWReviewActivityPattern,
        DisplayKey.get("Job.Review.Activity.Subject", Job.Subtype.Description),
        DisplayKey.get("Job.Review.Activity.Description"))
  }

  /**
   * Checks the conditions for which preemptions can be handled.
   */
  function canHandlePreemptions(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.HandlePreemptions"))
        .checkHasUnhandledPreemptions()
        .checkBranchNotLocked()
  }

  /**
   * Resolves unhandled preemptions and returns the new policy period.
   * NOTE: Access the job directly via the newBranch (rather than the Job property),
   * since this current period has been ripped off the Job and replaced with the
   * newBranch at this point in time.
   */
  function handlePreemptions(): ApplyChangesResult {
    canHandlePreemptions().assertOkay()

    var newBranch = _branch.createNewBranchForPreemption()

    // give JobProcess subclasses a chance to have their say
    processSpecificPreemptionHandling(newBranch)

    var conflicts = applyChanges(newBranch)
    relinkPreemptedEntitiesOutsideRevisionGraph(newBranch)
    // edit runs after applyChanges so that it affects beans added by applyChanges
    newBranch.edit()

    return new ApplyChangesResult(newBranch, conflicts, _branch.EditEffectiveDate)
  }

  private function relinkPreemptedEntitiesOutsideRevisionGraph(newBranch: PolicyPeriod) {
    _branch.Notes.each(\note -> {
      note.PolicyPeriod = newBranch
    })
    PermissionUtil.runAsSuperUser(\-> {
      _branch.Documents.each(\doc -> {
        doc = _branch.Bundle.add(doc)
        doc.PolicyPeriod = newBranch
      })
    } as Runnable)
    //customer should add custom history entities here if they are used
  }

  /**
   * Overridden by processes that have special preemption handling requirements
   */
  protected function processSpecificPreemptionHandling(newBranch: PolicyPeriod) {
  }

  /**
   * If this change is already being applied to the future renewal at
   * job finish, don't offer it as an option in the UI when the
   * job completes.
   */
  function applyChangeToFutureRenewalAutomatic(): boolean {
    return false
  }

  /**
   * Indicates whether changes to current period can be applied to renewal
   * that is bound in the future.
   */
  function canApplyChangesToFutureBoundRenewal(): boolean {
    return false
  }

  /**
   * Indicates whether changes to current period can be applied to an
   * unbound renewal in the future.
   */
  function canApplyChangesToFutureUnboundRenewal(): boolean {
    return false
  }

  /**
   * Applies changes from this policy change to the renewal that is bound
   * in the future.
   */
  function applyChangesToFutureBoundRenewal(): ApplyChangesResult[] {
    throw "Can't apply change to " + (typeof Job)
  }

  /**
   * Applies changes from this policy change to the unbound future renewal.
   */
  function applyChangesToFutureUnboundRenewal(): ApplyChangesResult[] {
    throw "Can't apply change to " + (typeof Job)
  }

  /**
   * Indicates whether changes to current period can be applied to an
   * unbound renewal in the future.
   */
  protected function canApplyChangeToFutureRenewal(promoted: boolean): boolean {
    return _branch.ResolveWithFuturePeriods and hasFutureRenewals(promoted)
  }

  protected function hasFutureRenewals(promoted: boolean): boolean {
    return _branch.NextRenewal?.Promoted == promoted
  }

  protected function prepareBranchForFinishingJob() {
    _branch.Status = TC_BOUND
    _branch.QuoteHidden = false
    clearAllAsyncQuoteIssues()
  }

  protected function commitBranch(fromProcessNotes: String) {
    try {
      _branch.Bundle.commit()
    } catch (e: Exception) {
      PCLoggerCategory.JOB_PROCESS.error("Unable to " + fromProcessNotes, e)
      throw e
    }
  }

  protected function applyChanges(newBranch: PolicyPeriod): List<DiffItem> {

    var conflicts = filterDiffsForConflicts(_branch.getDiffItems(DiffReason.TC_APPLYCHANGES), newBranch)

    newBranch.applyChangesFromBranch(_branch)
    newBranch.getSlice(newBranch.PeriodStart).mergeDuplicateAdds()

    // If we added objects that need to renumbered, do that here
    newBranch.renumberAutoNumberSequences()

    // if we're applying changes to the branch, syncables should all be in edit - including ones we just applied
    newBranch.AllAccountSyncables.each(\a -> a.prepareForJobEdit())

    removeApprovalsForPreemption(newBranch)

    return conflicts
  }

  private function removeApprovalsForPreemption(newBranch: PolicyPeriod) {
    newBranch.expireNextChangeApprovals()

    var preemptedDiffs = _branch.getDiffItems(DiffReason.TC_APPLYCHANGES)
    var preemptingDiffs = newBranch.BasedOn.getDiffItems(DiffReason.TC_APPLYCHANGES)

    removeApprovalsForUWIssueDiffs(preemptedDiffs, newBranch)
    removeApprovalsForUWIssueDiffs(preemptingDiffs, newBranch)
  }

  private function removeApprovalsForUWIssueDiffs(diffs: List<DiffItem>, newBranch: PolicyPeriod) {
    diffs
        .where(\diff -> diff.Bean typeis UWIssue)
        .each(\diff -> {
          var diffIssue = diff.Bean as UWIssue
          var newIssue = newBranch.UWIssuesActiveOnly.firstWhere(\issue -> issue.isSameTypeAndKey(diffIssue))
          if (newIssue != null
              && newIssue.Active
              && newIssue.HasApprovalOrRejection
              && !newIssue.Rejected) {
            newIssue.Approval.removeFutureApprovalsOrRejections()
          }
        })
  }

  protected function filterDiffsForConflicts(diffs: List<DiffItem>, newBranch: PolicyPeriod): List<DiffItem> {
    // Find conflicts, but don't include conflicts that are merge changes
    var conflicts = diffs.where(\d -> not d.canApplyDiffToBranch(newBranch) and not d.MergeChange).toList()

    // Filter the list for display
    var diffPlugin = Plugins.get(IPolicyPeriodDiffPlugin)
    return diffPlugin.filterDiffItems(DiffReason.TC_APPLYCHANGES, _branch, conflicts)
  }

  /**
   * Initializes a newly created job for a future period based on this job,
   * which is completing for an earlier period. This method is called by
   * PolicyCenter when the new job is created, as part of promoting this job's
   * period. The future job will already have its draft branch attached, with
   * the CancellationDate and Canceled bit set correctly. The OOSJob bit on
   * the job will also be set.
   *
   * @param futureJob The future job which is started in order to propagate changes from this
   *                  job forward. The future job is guaranteed to be of the same type as this job.
   */
  override function initializeFuturePeriodJob(futureJob: Job) {
    throw new UnsupportedOperationException("Cannot start future jobs of type " + futureJob.DisplayType)
  }

  function setPostUWRequestChanges() {
    //assign current user to initial referrer is it's not set
    if (not AssignmentUtil.isUserRoleInUse(this.Job, TC_INITIALREFERRER)) {
      Job.assignInitialReferrer()
    }

    _branch.EditLocked = true
    if (not _branch.ValidRate) {
      _branch.QuoteHidden = true
    }
  }

  function setPostUWApprovalChanges() {
    if (_branch.mustInvalidateQuoteBeforeReleasingUWEditLock(User.util.CurrentUser.UWAuthorityProfiles)) {
      edit()
    }
    _branch.EditLocked = false
    _branch.QuoteHidden = false

    //unset initial referrer
    var userRoleAssignment = this.Job.RoleAssignments.firstWhere(\u -> u.Role == TC_INITIALREFERRER)
    if (userRoleAssignment != null)
      this.Job.unassignUserRole(userRoleAssignment.AssignedUser, TC_INITIALREFERRER)
  }

  property get CurrentBlockingPointOfCurrentUser(): UWIssueBlockingPoint {
    return _branch.OOSSlices.reduce(UWIssueBlockingPoint.TC_NONBLOCKING, \maxBlockingPoint, slice -> {
      var sliceBlockingPoint = slice.UWIssuesActiveOnly
          .issuesBlockingUser(TC_BLOCKSISSUANCE, User.util.CurrentUser.UWAuthorityProfiles).CurrentBlockingPoint
      return sliceBlockingPoint.Priority > maxBlockingPoint.Priority ? sliceBlockingPoint : maxBlockingPoint
    })
  }

  //================================================================================
  // Terminal Functions
  //================================================================================

  /**
   * Indicates whether the Job can be expired.
   */
  override function canExpireJob(): boolean {
    return checkExpireJob().Okay
  }

  /**
   * Checks the conditions for which the Job can be expired.
   */
  private function checkExpireJob(): JobConditions {
    var conditions = startChecksFor(DisplayKey.get("Job.Process.ExpireJob")).checkJobNotComplete()
    Job.ActivePeriods.each(\branch -> conditions.append(branch.JobProcess.canExpire()))
    return conditions
  }

  /**
   * Checks the conditions for which the policy period can be expired.
   */
  function canExpire(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.Expire"))
        .checkStatus(AllowedExpireStatus)
        .checkBranchNotLocked()
  }

  /**
   * Expires all active policy periods in the job, and sets the selected version of the job to
   * the branch from which the expiration was started.
   */
  override function expireJob() {
    checkExpireJob().assertOkay()
    JobProcessLogger.logInfo("Expiring job \"" + Job + "\"")
    Job.ActivePeriods.each(\branch -> branch.JobProcess.expireWithoutCheckingConditions())
    Job.SelectedVersion = _branch
    _branch.maybeCreatePaymentActivity()
  }

  /**
   * Expires this policy period, resetting the selected version of the job if needed.
   */
  function expire() {
    canExpire().assertOkay()
    expireWithoutCheckingConditions()
  }

  // useful to eliminate redundant checks because expireJob already check canExpire for each of the branches
  private function expireWithoutCheckingConditions() {
    clearAllAsyncQuoteIssues()
    lockBranchWithStatus(TC_EXPIRED)
  }

  /**
   * Sets the branch status, invalidates the quote and locks the branch. If this was the last
   * active branch in the job, then any open activities on the job are also canceled. Otherwise
   * updates the selected version of the job if needed.
   */
  protected function lockBranchWithStatus(lockedStatus: PolicyPeriodStatus) {
    _branch.Status = lockedStatus
    _branch.markInvalidQuote()
    _branch.lockBranch()
    var activePeriods = Job.ActivePeriods
    if (activePeriods.IsEmpty) {
      this.cancelOpenActivities()
    } else if (Job.SelectedVersion == _branch) {
      Job.SelectedVersion = activePeriods.maxBy(\p -> p.BranchNumber)
    }

    JobProcessContextUpdater.updateContext(_branch)
    IntentionalLogger.logResult(
        Marker,
        "Operation completed",
        LogMessageParams.create()
            .put("result.outcome", lockedStatus.DisplayName)
            .put("result.value", _branch.EstimatedPremium)
    )
    JobProcessContextUpdater.clearContext()
  }

  protected function initializeProducers() {
    var producerCode = Job.Policy.ProducerCodeOfService
    if (producerCode != null) {
      _branch.EffectiveDatedFields.ProducerCode = producerCode
      _branch.ProducerCodeOfRecord = producerCode
    }
  }

  protected function syncProductModel() {
    // Sync computed values as well as all coverages, modifiers, and questions
    _branch.syncComputedValues()
    _branch.syncOffering()
    _branch.syncQuestions()
    _branch.Lines*.AllCoverables.each(\c -> c.createOrSyncCoverages())
    _branch.AllModifiables.each(\m -> m.syncModifiers())
    _branch.Lines.each(\l -> l.syncQuestions())
    _branch.PolicyLocations.each(\pl -> pl.syncQuestions())
  }

  /**
   * Check the conditions for which this Job can be withdrawn.  Withdraw may not be allowed
   * due to a number of factors, including status of one or more active branches on the job.
   */
  function canWithdrawJob(): JobConditions {
    var activePeriods = Job.ActivePeriods
    var conditions = startChecksFor(DisplayKey.get("Job.Process.WithdrawJob"))
        .checkJobNotComplete()
        .checkCondition(activePeriods.HasElements, "No active periods")
    activePeriods?.each(\branch -> conditions.append(branch.JobProcess.canWithdraw()))
    return conditions
  }

  /**
   * Check the conditions for which this policy period can be withdrawn.
   */
  function canWithdraw(): JobConditions {
    return startChecksFor(DisplayKey.get("Job.Process.Withdraw"))
        .checkBranchNotLocked()
        .checkWithdrawPermission()
        .checkNotPromoted()
        .checkNotStatus(PolicyPeriodStatus.TF_QUOTEINPROGRESS)
  }

  /**
   * Withdraws all active policy periods in the job, and sets the selected version of the job to
   * the branch from which the withdrawal was started.
   */
  function withdrawJob() {
    canWithdrawJob().assertOkay()
    JobProcessLogger.logInfo("Withdrawing job \"" + Job + "\"")
    Job.ActivePeriods.each(\branch -> branch.JobProcess.withdrawWithoutCheckingConditions())
    Job.SelectedVersion = _branch
  }

  /**
   * Withdraws this policy period, resetting the selected version of the job if needed.
   */
  function withdraw() {
    canWithdraw().assertOkay()
    withdrawWithoutCheckingConditions()
  }

  /*
   * Can be used to eliminate redundant checks because withdrawJob already checks canWithdraw
   * for each of the branches.
   */
  protected function withdrawWithoutCheckingConditions() {
    JobProcessLogger.logInfo("Withdrawing branch: " + _branch)
    var plugin = Plugins.get(IReinsurancePlugin)
    plugin.withdrawBranch(_branch)
    clearAllAsyncQuoteIssues()
    lockBranchWithStatus(TC_WITHDRAWN)
  }

  /**
   * Withdraws all active branches on the policy except the branch associated with this job.
   * Resets the SideBySide flag if it's set.
   */
  function withdrawOtherActivePeriods() {
    startChecksFor(DisplayKey.get("Job.Process.WithdrawOther")).checkTermNotArchived().assertOkay()
    Job.ActivePeriods.where(\period -> period != _branch).each(\period -> period.JobProcess.withdrawWithoutCheckingConditions())
    if (Job.SideBySide) {
      Job.SideBySide = false
    }
    Job.SelectedVersion = _branch
  }

  /**
   * Indicates if billing for this job is subject to a final audit, as is generally the case for canceled policies
   * that are subject to audit.
   */
  property get BillingSubjectToFinalAudit(): boolean {
    return false
  }

  /**
   * Indicates if the depositAmount on reporting plan should be recalculated when a valid quote is generated
   * <p>
   * Currently depositAmount is recalculated during submission, rewrite, renewal, issuance,
   * policy change and reinstatement in WC reporting policies.
   */
  property get RecalculateDepositOnReportingAfterValidQuote(): boolean {
    return false
  }

  /**
   * Send billing instructions to the billing system.
   */
  protected abstract function createBillingEventMessages() // See subtype implementations

  /**
   * Takes this Job to issuance, whatever that means for the specific type of Job.
   *
   * @param bindAndIssue should be true for most jobs, but may be false for (esp Submission) jobs
   *                     which distinguish bind-only from bind-and-issue.
   */
  protected abstract function issueJob(bindAndIssue: boolean)

  /**
   * Indicates if process is driven by the system.
   */
  property get AutomatedProcess(): boolean {
    return _automatedProcess
  }

  protected property set AutomatedProcess(flag: boolean) {
    _automatedProcess = flag
  }

  /**
   * Discovers all issues with the policy graph based on what the product model allows (availability, etc.).
   * For example, this checks coverages, conditions, exclusions, modifiers, offerings, answers.
   *
   * @param branch the PolicyPeriod to check
   */
  static function checkBranchAgainstProductModel(branch: PolicyPeriod): List<ProductModelSyncIssueWrapper> {
    return PCProfilerTag.PRODUCT_MODEL_SYNC.evaluate(\p -> {
      p.setPropertyValue("SyncType", PCProfilerTag.ProductModelSyncType.Branch.name())
      using (new AvailabilityContextScope()) {
        var issues: List<ProductModelSyncIssueWrapper>

        if (parallelizeProductModelSync(branch)) {
          var numOfThreads = PCConfigParameters.MaxProductModelSyncThreadPoolSize.Value
          JobProcessLogger.logInfo("Multi-threaded product model availability checking enabled for job #${branch.Job.JobNumber} with initial thread pool size of ${numOfThreads}")
          var pool : ForkJoinPool
          try {
            //The order of these operarions is important. When creating the tasks, the "task root beans" are loaded into the current bundle.
            //As the forkjointhreadpool is created, a copy of this bundle is made to serve as seed to the thread bundles.
            //If this seed does not contain all root beans for the tasks to be executed then execution will fail.
            //When extending this code to add additional tasks, make sure the required beans for execution are loaded into the current bundle.
            var tasks = createProductModelCheckTasks(branch)
            pool = createForkJoinThreadPool(numOfThreads, branch.Bundle)
            issues = executeProductModelCheckTasks(branch, pool, tasks)
          } catch (ee: ExecutionException) {
            JobProcessLogger.logError(DisplayKey.get("Job.Process.ProductModelSync.Error.Task", branch.Job.JobNumber), ee)
            var taskException = ee.getCause()
            throw (taskException != null) ? taskException : new DisplayableException(DisplayKey.get("Job.Process.ProductModelSync.UserMessage", branch.Job.JobNumber))
          } catch (e: Exception) {
            JobProcessLogger.logError(DisplayKey.get("Job.Process.ProductModelSync.Error.SystemResources", branch.Job.JobNumber), e)
            throw new DisplayableException(DisplayKey.get("Job.Process.ProductModelSync.UserMessage", branch.Job.JobNumber))
          } finally {
            pool?.shutdownNow()
          }
        } else {
          JobProcessLogger.logInfo("Using single-threaded product model availability checking for job #${branch.Job.JobNumber}")
          issues = performProductModelChecks(branch)
        }

        JobProcessLogger.logInfo("Product model availability checking for job #${branch.Job.JobNumber} complete")
        p.setPropertyValue("NumIssues", String.valueOf(issues.size()))

        return issues
      }
    })
  }

  private static function performProductModelChecks(branch: PolicyPeriod): List<ProductModelSyncIssueWrapper> {
    var issues = new ArrayList<ProductModelSyncIssueWrapper>()
    JobProcessLogger.logInfo("Performing product model availability checks for job #${branch.Job.JobNumber}")
    branch.AllCoverables.each(\coverable -> issues.addAll(getProductModelSyncIssuesForCoverable(coverable, coverable.PolicyLine))) // For all coverables across all lines of business on the policy period

    branch.AllModifiables.each(\modifiable -> issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(modifiable.checkModifiersAgainstProductModel())))

    issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(branch.checkOfferingAgainstProductModel()))
    issues.addAll(branch.checkPolicyTermAgainstProductModel())

    // Check answers on the PolicyPeriod, PolicyLines and PolicyLocations
    issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(branch.checkAnswersAgainstProductModel()))
    branch.Lines.each(\line -> issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(line.checkAnswersAgainstProductModel())))
    branch.PolicyLocations.each(\location -> issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(location.checkAnswersAgainstProductModel())))
    return issues
  }

  private static function createProductModelCheckTasks(branch: PolicyPeriod): List<CheckProductModelTask> {
    var tasks = new ArrayList<CheckProductModelTask>()
    JobProcessLogger.logInfo("Creating product model availability check tasks for job #${branch.Job.JobNumber}")

    // For all coverables across all lines of business on the policy period
    branch.AllCoverables.each(\coverable -> {
        tasks.add(new CheckCoverableCoveragesTask(coverable))
        tasks.add(new CheckCoverableConditionsTask(coverable))
        tasks.add(new CheckCoverableExclusionsTask(coverable))
      }
    )

    branch.AllModifiables.each(\modifiable -> tasks.add(new CheckModifiersTask(modifiable)))

    tasks.add(new CheckOfferingTask(branch))
    tasks.add(new CheckPolicyTermTask(branch))

    // Check answers on the PolicyPeriod, PolicyLines and PolicyLocations
    tasks.add(new CheckBranchAnswersTask(branch))
    branch.Lines.each(\line -> tasks.add(new CheckLineAnswersTask(line)))
    branch.PolicyLocations.each(\location -> tasks.add(new CheckLocationAnswersTask(location)))
    return tasks
  }

  private static function executeProductModelCheckTasks(branch: PolicyPeriod, pool: ForkJoinPool, tasks: List<CheckProductModelTask>): List<ProductModelSyncIssueWrapper> {
    var futures = tasks.map<ForkJoinTask>(\task: CheckProductModelTask -> {
      var profiledTask = Profiler.createPotentiallyProfiledCallable(
          PCProfilerTag.PARALLEL_PRODUCT_MODEL_SYNC,
          "ProductModelCheckThread "+task.Class.SimpleName+" for (" + task.BeanID.getType().RelativeName+":"+task.BeanID+")",
          task)
      return pool.submit(profiledTask)
    })
    var issues = new ArrayList<ProductModelSyncIssueWrapper>()
    JobProcessLogger.logInfo("Executing product model availability check tasks for job #${branch.Job.JobNumber}")
    pool.shutdown() // Pool will not accept new tasks but will finish the previously submitted tasks

    var shouldEnforceTimeout = ParallelProductModelSyncTimeoutPerCoverable >= 0
    if (shouldEnforceTimeout) {
      var waitTime = Math.max(ParallelProductModelSyncTimeoutPerCoverable, branch.AllCoverables.length * ParallelProductModelSyncTimeoutPerCoverable)
      var allTasksCompleted = pool.awaitTermination(waitTime, TimeUnit.MILLISECONDS)
      if (not allTasksCompleted) {
        throw new TimeoutException("Parallel product model sync timed out after ${waitTime} milliseconds")
      }
    }

    futures.each(\futureTask -> issues.addAll(futureTask.get() as List<ProductModelSyncIssueWrapper>))
    return issues
  }

  private static property get ParallelProductModelSyncTimeoutPerCoverable(): int {
    return PCConfigParameters.ParallelProductModelSyncTimeoutPerCoverable.Value
  }

  private static function getProductModelSyncIssuesForCoverable(coverable: Coverable, line: PolicyLine): List<ProductModelSyncIssueWrapper> {
    var issues = new ArrayList<ProductModelSyncIssueWrapper>()
    issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(coverable.checkCoveragesAgainstProductModelwLine(line)))
    issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(coverable.checkConditionsAgainstProductModelwLine(line)))
    issues.addAll(ProductModelSyncIssueWrapper.wrapIssues(coverable.checkExclusionsAgainstProductModelwLine(line)))
    return issues
  }

  private static function parallelizeProductModelSync(branch: PolicyPeriod): boolean {
    return (PCConfigParameters.ParallelizedProductModelSyncEnabled.Value
        and branch.shouldParallelizeProductModelAvailabilitySync())
  }

  private static function createForkJoinThreadPool(numThreads: int, originalBundle: Bundle): ForkJoinPool {
    final var namePrefix = "pmodelsync-pool-" + _threadPoolNumber.getAndIncrement() + "-thread-"
    final var threadNumber = new AtomicInteger(1)

    JobProcessLogger.logDebug("Creating thread pool: name=" + Thread.currentThread().getName() + ", threads=" + numThreads)
    var copiedBundle = createParallelProductModelSyncBundle(originalBundle)
    return new ForkJoinPool(numThreads, \pool -> {
      // Each thread should get its own copy of the bundle
      var threadBundle = createParallelProductModelSyncBundle(copiedBundle)
      return new ForkJoinProductModelSyncThread(pool, threadBundle, namePrefix + threadNumber.getAndIncrement())
    },
        null, // UncaughtExceptionHandler
        true) // async mode: true for FIFO, false for LIFO
  }

  private static function createParallelProductModelSyncBundle(originalBundle: Bundle): Bundle {
    var copiedBundle = new ParallelProductModelSyncBundle()
    copiedBundle.copy(originalBundle)
    return copiedBundle
  }

  /**
   * Performs the given action as the specified user, for use during automated
   * processing where the system is acting on a user's behalf.
   *
   * @param user     the User to act as
   * @param action() the action to take
   */
  protected function executeAsAutomatedUser(user: User, action()) {
    executeAsIdentifiedUser(user.ID, action)
  }

  private function executeAsSuperUser(action()) {
    var superUserID =
        PLDependenciesGateway.getSuperUserIdentifier().getSystemServicesUserId()
    executeAsIdentifiedUser(superUserID, action)
  }

  /**
   * Performs the given action as the user specified by ID.
   *
   * @param userID   The identifier of the user to act as
   * @param action() the action to take
   */
  private function executeAsIdentifiedUser(userID: Key, action()) {
    var oldToken = PLDependenciesGateway.getCommonDependencies().getServiceToken()
    var newToken = PLDependenciesGateway.getServiceTokenManager().createAuthenticatedToken(userID)
    var oldAutomatedProcessValue = this.AutomatedProcess
    try {
      this.AutomatedProcess = true
      PLDependenciesGateway.getCommonDependencies().setServiceToken(newToken)
      action()
    } finally {
      this.AutomatedProcess = oldAutomatedProcessValue
      PLDependenciesGateway.getCommonDependencies().setServiceToken(oldToken)
      PLDependenciesGateway.getServiceTokenManager().removeToken(newToken)
    }
  }

  function setPaymentInfoWithNewQuote() {
    if (_branch.NewInvoiceStream == null) {
      _branch.NewInvoiceStream = new BillingInvoiceStream(_branch)
    }

    if (_branch.InvoiceStreamOverrides == null) {
      _branch.InvoiceStreamOverrides = new InvoiceStreamOverrides(_branch)
    } else {
      _branch.InvoiceStreamOverrides.clearStaleValues()
    }

    var originalBillingMethod = _branch.BillingMethod
    var originalAltBillingAccountNumber = _branch.AltBillingAccountNumber

    _branch.BillingMethod = _branch.calculateDefaultBillingMethod()
    _branch.AltBillingAccountNumber = _branch.calculateDefaultAltBillingAccountNumber(_branch.BillingMethod)

    if (originalBillingMethod != _branch.BillingMethod || originalAltBillingAccountNumber != _branch.AltBillingAccountNumber) {
      _branch.InvoiceStreamCode = null
      _branch.unsetPaymentPlan()
    }

    var defaultPaymentPlan = _branch.calculateDefaultPaymentPlan()
    _branch.selectPaymentPlan(defaultPaymentPlan)

    _branch.InvoiceStreamCode = _branch.calculateDefaultInvoiceStreamCode()
    _branch.InvoicingMethod = _branch.calculateDefaultInvoicingMethod()

    if (_branch.CustomBilling && _branch.InvoiceStreamCode == null && _branch.NewInvoiceStream != null) {
      _branch.NewInvoiceStream.Interval = _branch.PaymentFrequency
    }

    if (_branch.ReportingPlanSelected) {
      _branch.WaiveDepositChange = false
      if (RecalculateDepositOnReportingAfterValidQuote) {
        _branch.calculateAndSetDepositAmountOnReporting()
      }
    }
  }

  /**
   * Callback for JobProcess class to perform clean-up actions. Used OOTB to remove selected payment plan
   * in NewTermProcess.
   */
  function cleanUpAfterEdit() {
    // Do nothing
  }

  /**
   * Gets installment plan preview from the billing system for the given payment plan.
   *
   * @param paymentPlan the payment plan
   * @return PaymentPreviewItem[]
   */
  function retrieveInstallmentsPlanPreviewFromBillingSystem(paymentPlan: PaymentPlanData): BillingPaymentsPreview {
    JobProcessLogger.logInfo("Retrieving installments plan previews from Billing System, branch: " + _branch + " Payment Plan: " + paymentPlan.Name)
    var plugin = Plugins.get(IBillingSystemPlugin)
    JobProcessLogger.logDebug("Current Plugin definition ${plugin}")
    return plugin.retrieveInstallmentsPlanPreview(_branch, paymentPlan)
  }

  /**
   * Releases quote that is hidden if all issues that are blocking rate release for a rated policy
   * (or blocking quote release for a quoted policy) have been approved or are auto-approvable by
   * the current user.
   */
  function attemptQuoteReleaseForNonprivilegedUser() {
    QuoteProcess.attemptQuoteReleaseForNonprivilegedUser()
  }

  protected function bindReinsurableRisks() {
    var plugin = Plugins.get(IReinsurancePlugin)
    plugin.bindBranch(_branch)
  }

  /**
   * Callback method to enable customization of any actions that have to happen pre-quote, i.e. RIGHT before the requestQuote fires.
   */
  protected function runPreQuote() {
  }

  /**
   * Ensures the policy period being used to create this one is available for use in BC
   */
  protected function checkThatBasedOnPeriodNotArchivedInBillingSystem() {
    var isArchived = false
    try {
      isArchived = _branch.BasedOn != null and _branch.BasedOn.IsArchivedInBillingSystem
    } catch (e: Exception) {
      // do nothing and assume it is not archived
    }
    if (isArchived) {
      throw new DisplayableException(DisplayKey.get("Job.Error.PolicyPeriodArchivedInBillingSystem"))
    }
  }

  //================================================================================
  // Helper Functions
  //================================================================================

  private static function getSliceDateAsString<E extends EffDatedBase>(originalBean: E): String {
    return (originalBean.Slice ? originalBean.SliceDate.ShortFormat : "N/A")
  }

  //================================================================================
  // Inner Classes
  //================================================================================

  /**
   * A {@link java.util.concurrent.Callable} class for checking a {@link Coverage) for product
   * model synchronization issues in parallel.
   */
  private static class CheckCoverableCoveragesTask extends CheckCoverableTask {

    construct(coverable: Coverable) {
      super(coverable)
    }

    function checkCoverable(coverable: Coverable): List<ProductModelSyncIssue> {
      return coverable.checkCoveragesAgainstProductModelwLine(coverable.PolicyLine)
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking a {@link PolicyCondition) for product
   * model synchronization issues in parallel.
   */
  private static class CheckCoverableConditionsTask extends CheckCoverableTask {

    construct(coverable: Coverable) {
      super(coverable)
    }

    override function checkCoverable(coverable: Coverable): List<ProductModelSyncIssue> {
      return coverable.checkConditionsAgainstProductModelwLine(coverable.PolicyLine)
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking an {@link Exclusion) for product
   * model synchronization issues in parallel.
   */
  private static class CheckCoverableExclusionsTask extends CheckCoverableTask {

    construct(coverable: Coverable) {
      super(coverable)
    }

    override function checkCoverable(coverable: Coverable): List<ProductModelSyncIssue> {
      return coverable.checkExclusionsAgainstProductModelwLine(coverable.PolicyLine)
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking a {@link Modifiable) for product
   * model synchronization issues in parallel.
   */
  private static class CheckModifiersTask extends CheckProductModelTask<Modifiable> {

    construct(modifiable: Modifiable) {
      super(modifiable)
    }

    override function executeTask(): List<ProductModelSyncIssueWrapper<ProductModelSyncIssue>> {
      JobProcessLogger.logDebug("Checking modifiers: modifiable=" + SlicedRootBean.DisplayName +
          ", modifiable.Slice=" + SlicedRootBean.Slice +
          ", modifiable.SliceDate=" + getSliceDateAsString(SlicedRootBean))
      return ProductModelSyncIssueWrapper.wrapIssues(SlicedRootBean.checkModifiersAgainstProductModel())
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking {@link PolicyPeriod) question
   * answers for product model synchronization issues in parallel.
   */
  private static class CheckBranchAnswersTask extends CheckBranchTask {

    construct(branch: PolicyPeriod) {
      super(branch)
    }

    override function executeTask(): List<ProductModelSyncIssueWrapper<ProductModelSyncIssue>> {
      JobProcessLogger.logDebug("Checking answers: branch=" + SlicedRootBean.DisplayName +
          ", branch.Slice=" + SlicedRootBean.Slice +
          ", branch.SliceDate=" + getSliceDateAsString(SlicedRootBean))
      return ProductModelSyncIssueWrapper.wrapIssues(SlicedRootBean.checkAnswersAgainstProductModel())
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking {@link PolicyPeriod) offerings for
   * product model synchronization issues in parallel.
   */
  private static class CheckOfferingTask extends CheckBranchTask {

    construct(branch: PolicyPeriod) {
      super(branch)
    }

    override function executeTask(): List<ProductModelSyncIssueWrapper<ProductModelSyncIssue>> {
      JobProcessLogger.logDebug("Checking offering: branch=" + SlicedRootBean.DisplayName +
          ", branch.Slice=" + SlicedRootBean.Slice +
          ", branch.SliceDate=" + getSliceDateAsString(SlicedRootBean))
      return ProductModelSyncIssueWrapper.wrapIssues(SlicedRootBean.checkOfferingAgainstProductModel())
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking a {@link PolicyPeriod) term for
   * product model synchronization issues in parallel.
   */
  private static class CheckPolicyTermTask extends CheckBranchTask {

    construct(branch: PolicyPeriod) {
      super(branch)
    }

    override function executeTask(): List<ProductModelSyncIssueWrapper<ProductModelSyncIssue>> {
      JobProcessLogger.logDebug("Checking policy term: branch=" + SlicedRootBean.DisplayName +
          ",branch.Slice=" + SlicedRootBean.Slice +
          ", branch.SliceDate=" + getSliceDateAsString(SlicedRootBean))
      return SlicedRootBean.checkPolicyTermAgainstProductModel()
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking {@link PolicyLine) question answers
   * for product model synchronization issues in parallel.
   */
  private static class CheckLineAnswersTask extends CheckProductModelTask<PolicyLine> {

    construct(line: PolicyLine) {
      super(line)
    }

    override function executeTask(): List<ProductModelSyncIssueWrapper<ProductModelSyncIssue>> {
      JobProcessLogger.logDebug("Checking answers: line=" + SlicedRootBean.DisplayName +
          ", line.Slice=" + SlicedRootBean.Slice +
          ", line.SliceDate=" + getSliceDateAsString(SlicedRootBean))
      return ProductModelSyncIssueWrapper.wrapIssues(SlicedRootBean.checkAnswersAgainstProductModel())
    }
  }

  /**
   * A {@link java.util.concurrent.Callable} class for checking {@link PolicyLocation) question answers
   * for product model synchronization issues in parallel.
   */
  private static class CheckLocationAnswersTask extends CheckProductModelTask<PolicyLocation> {

    construct(location: PolicyLocation) {
      super(location)
    }

    override function executeTask(): List<ProductModelSyncIssueWrapper<ProductModelSyncIssue>> {
      JobProcessLogger.logDebug("Checking answers: location=" + SlicedRootBean.DisplayName +
          ", location.Slice=" + SlicedRootBean.Slice +
          ", location.SliceDate=" + getSliceDateAsString(SlicedRootBean))
      return ProductModelSyncIssueWrapper.wrapIssues(SlicedRootBean.checkAnswersAgainstProductModel())
    }
  }

  /**
   * An abstract {@link java.util.concurrent.Callable} class for checking a {@link PolicyPeriod) for product
   * model synchronization issues in parallel.
   */
  private static abstract class CheckBranchTask extends CheckProductModelTask<PolicyPeriod> {

    construct(branch: PolicyPeriod) {
      super(branch)
    }
  }

  /**
   * An abstract {@link java.util.concurrent.Callable} class for checking a {@link Coverable) for product
   * model synchronization issues in parallel.
   */
  private static abstract class CheckCoverableTask extends CheckProductModelTask<Coverable> {

    construct(coverable : Coverable) {
      super(coverable)
    }

    override function executeTask(): List<ProductModelSyncIssueWrapper<ProductModelSyncIssue>> {
      var coverable = SlicedRootBean
      JobProcessLogger.logDebug("Checking coverable: coverable=" + coverable.DisplayName +
          ", coverable.Slice=" + coverable.Slice +
          ", coverable.SliceDate=" + getSliceDateAsString(coverable))
      return ProductModelSyncIssueWrapper.wrapIssues(checkCoverable(coverable))
    }

    abstract function checkCoverable(coverable: Coverable): List<ProductModelSyncIssue>
  }

  /**
   * An abstract {@link java.util.concurrent.Callable} class for checking for product model synchronization
   * issues in parallel.
   */
  private static abstract class CheckProductModelTask<E> implements Callable<List<ProductModelSyncIssueWrapper>> {
    var _threadBundle: ParallelProductModelSyncBundle
    final private var _rootBeanID : Key as readonly BeanID
    final private var _rootBeanSliceDate : Date
    private var _slicedThreadBundleBean : E

    construct(rootBean : EffDatedBase) {
      _rootBeanID = rootBean.ID
      if (rootBean.Slice) {
        _rootBeanSliceDate = rootBean.SliceDate
      } else {
        _rootBeanSliceDate = null
      }
    }

    property get SlicedRootBean(): E {
      if (_slicedThreadBundleBean == null) {
        //due to lazy initialization SlicedRootBean must be called only by the worker thread processing the task
        //otherwise we could end up initializing it from a bundle different from the thread bundle we're working with
        if (_threadBundle == null) {
          throw new IllegalStateException("Attempted to access root bean for parallel product model sync task before thread bundle initialization")
        }
        _slicedThreadBundleBean = _threadBundle.getEffDatedWithSliceDate(_rootBeanID, _rootBeanSliceDate) as E
      }
      return _slicedThreadBundleBean
    }

    override function call(): List<ProductModelSyncIssueWrapper> {
      var currThread = Thread.currentThread() as ForkJoinProductModelSyncThread
      // New thread has no security context. So create a new security token for each thread.
      final var origToken = PLDependencies.getCommonDependencies().getServiceToken()
      final var newToken = PLDependencies.getServiceTokenManager().createAuthenticatedToken(User.util.CurrentUser?.ID)
      _threadBundle = currThread.Bundle as ParallelProductModelSyncBundle
      setupTask()
      try {
        PLDependencies.getCommonDependencies().setServiceToken(newToken)
        ThreadLocalBundleProvider.set(_threadBundle)
        return executeTask()
      } finally {
        ThreadLocalBundleProvider.clear()
        PLDependencies.getCommonDependencies().setServiceToken(origToken)
        PLDependencies.getServiceTokenManager().removeToken(newToken)
      }
    }

    function setupTask() {
    }

    abstract function executeTask(): List<ProductModelSyncIssueWrapper>
  }

  static class ForkJoinProductModelSyncThread extends ForkJoinWorkerThread {
    final var _bundle: Bundle as readonly Bundle

    construct(pool: ForkJoinPool, bundle: Bundle, name: String) {
      super(pool)
      super.setName(name)
      _bundle = bundle
    }
  }

  /**
   * A bundle that does not allow {@link #commit()} and will throw an UnsupportedOperationException if commit is called.
   * <p>
   * ParallelProductModelSyncBundle was designed specifically for parallelization of the product model sync operation. During
   * parallelization, each child thread has its own ParallelProductModelSyncBundle and the beans from the main thread are copied
   * into it. This is necessary so that all threads view the same data during the sync operation.
   * <p>
   * This bundle is non-persistable as the parallelized product model sync checkBranchAgainstProductModel step should never modify the policy graph
   */
  private static class ParallelProductModelSyncBundle extends PCNeverPersistedBundle {

    /**
     * Get a copy from the original bean in this bundle and slice it according to the original bean slice date
     *
     * @param originalBeanKey ID of bean to get from bundle
     * @param originalBeanSliceDate SliceDate of original bean or null if in window mode
     * @return bean from bundle sliced according to the slice date received
     * @throws IllegalArgumentException if copy of original bean not found in the bundle
     */
    reified function getEffDatedWithSliceDate<E extends EffDatedBase>(originalBeanKey: Key, originalBeanSliceDate: Date): E {
      var threadBundleEffDated = this.getBeanInBundle(originalBeanKey) as E
      if (threadBundleEffDated == null) {
        throw new IllegalArgumentException("Failed to retrieve copy of bean "+originalBeanKey+" from parallel product model sync bundle")
      } else if (originalBeanSliceDate != null) {
        threadBundleEffDated = threadBundleEffDated.getSliceUntyped(originalBeanSliceDate) as E
      }
      return threadBundleEffDated
    }
  }
}