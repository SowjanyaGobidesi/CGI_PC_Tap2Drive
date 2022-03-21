package gw.api.job

uses gw.api.locale.DisplayKey

uses java.lang.IllegalArgumentException
uses java.lang.UnsupportedOperationException

@Export
class JobMethodsDefaultImpl implements JobMethods {

  protected var _job : Job

  construct(job : Job) {
    _job = job
  }

  override property get AccountSyncingEnabled() : boolean {
    throw new UnsupportedOperationException("Subclass must override the AccountSyncingEnabled property")
  }

  override property get AccountSyncingIsDateAware() : boolean {
    throw new UnsupportedOperationException("Subclass must override the AccountSyncingIsDateAware property")
  }

  override property get DisplayType() : String {
    return _job.Subtype.DisplayName
  }

  override property get Viewable() : boolean {
    throw new UnsupportedOperationException("Subclass must override the Viewable property")
  }

  override function isOpenForEdit(policyPeriod : PolicyPeriod) : boolean {
    checkPolicyPeriodIsOnJob(policyPeriod)
    return isOpenForEditImpl(policyPeriod)
  }

  /**
   * True if the policyPeriod on this job should be open for edit because
   * it's in the correct state and the user has the appropriate job permissions.
   * Called by #isOpenForEdit that additionally checks that the given PolicyPeriod
   * is on the same job.
   */
  protected function isOpenForEditImpl(policyPeriod : PolicyPeriod) : boolean {
    throw new UnsupportedOperationException("Subclass must override the isOpenForEditImpl method")
  }

  override function isAvailableForSideBySideEdit(policyPeriod : PolicyPeriod) : boolean {
    checkPolicyPeriodIsOnJob(policyPeriod)
    return isAvailableForSideBySideEditImpl(policyPeriod)
  }

  /**
   * True if the policyPeriod on this job should be available for side-by-side
   * quoting because it's in the correct state and the user has the appropriate
   * job permissions. Called by #isAvailableForSideBySideEdit that additionally checks that the given PolicyPeriod
   * is on the same job.
   */
  protected function isAvailableForSideBySideEditImpl(policyPeriod : PolicyPeriod) : boolean {
    throw new UnsupportedOperationException("Subclass must override the isAvailableForSideBySideEditImpl method")
  }

  override function getValidationLevel(policyPeriod : PolicyPeriod) : ValidationLevel {
    checkPolicyPeriodIsOnJob(policyPeriod)
    return getValidationLevelImpl(policyPeriod)
  }

  /**
   * The validation level for the policyPeriod on this job.
   * Called by #getValidationLevel that additionally checks that the given PolicyPeriod
   * is on the same job.
   */
  function getValidationLevelImpl(policyPeriod : PolicyPeriod) : ValidationLevel {
    return typekey.ValidationLevel.TC_QUOTABLE
  }

  override function getRatingStyle(policyPeriod : PolicyPeriod) : RatingStyle {
    checkPolicyPeriodIsOnJob(policyPeriod)
    return getRatingStyleImpl(policyPeriod)
  }

  /**
   * The rating style for the policyPeriod on this job.
   * Called by #getRatingStyle that additionally checks that the given PolicyPeriod
   * is on the same job.
   */
  function getRatingStyleImpl(policyPeriod : PolicyPeriod) : RatingStyle {
    return typekey.RatingStyle.TC_DEFAULT
  }

  override property get CanUpdatePeriodDates() : boolean {
    throw new UnsupportedOperationException("Subclass must override the canUpdatePeriodDates method")
  }

  override property get CanCopyCoverages()  : boolean {
    throw new UnsupportedOperationException("Subclass must override the canCopyCoverages method")
  }

  override function canViewModifiers(policyPeriod : PolicyPeriod) : boolean {
    throw new UnsupportedOperationException("Subclass must override the canViewModifiers method")
  }

  override function createSuccessfulAsyncRateActivity(user: User, policyPeriod: PolicyPeriod): Activity {
    var activitySubject = createQuoteActivityText(
        "Job.Operation.RateAsync.WorkQueue.Activity.Successful.Subject",
        "Job.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Successful.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Job.Operation.RateAsync.WorkQueue.Activity.Successful.Description",
        "Job.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Successful.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject, activityDescription)
  }

  override function createSuccessfulAsyncQuoteActivity(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Job.Operation.QuoteAsync.WorkQueue.Activity.Successful.Subject",
        "Job.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Successful.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Job.Operation.QuoteAsync.WorkQueue.Activity.Successful.Description",
        "Job.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Successful.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject,
        activityDescription)
  }

  override function createFailedAsyncRateActivity(user: User, policyPeriod: PolicyPeriod): Activity {
    var activitySubject = createQuoteActivityText(
        "Job.Operation.RateAsync.WorkQueue.Activity.Failed.Subject",
        "Job.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Failed.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Job.Operation.RateAsync.WorkQueue.Activity.Failed.Description",
        "Job.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Failed.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject, activityDescription)  }

  override function createFailedAsyncQuoteActivity(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Job.Operation.QuoteAsync.WorkQueue.Activity.Failed.Subject",
        "Job.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Failed.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Job.Operation.QuoteAsync.WorkQueue.Activity.Failed.Description",
        "Job.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Failed.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject,
        activityDescription)
  }

  override function createSuccessfulAsyncRateActivityWithWarnings(user: User, policyPeriod: PolicyPeriod): Activity {
    var activitySubject = createQuoteActivityText(
        "Job.Operation.RateAsync.WorkQueue.Activity.SuccessfulWithWarning.Subject",
        "Job.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Job.Operation.RateAsync.WorkQueue.Activity.SuccessfulWithWarning.Description",
        "Job.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject, activityDescription)  }

  override function createSuccessfulAsyncQuoteActivityWithWarnings(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Job.Operation.QuoteAsync.WorkQueue.Activity.SuccessfulWithWarning.Subject",
        "Job.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Job.Operation.QuoteAsync.WorkQueue.Activity.SuccessfulWithWarning.Description",
        "Job.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject,
        activityDescription)
  }

  /**
   * Checks that that the given PolicyPeriod is on the this job.
   */
  protected function checkPolicyPeriodIsOnJob(policyPeriod : PolicyPeriod) {
    if (policyPeriod.Job != _job) {
      throw new IllegalArgumentException("The policy period, ${policyPeriod}, must be on this job, ${_job}.")
    }
  }

  /**
   * Returns the converted DisplayKey for the passed-in displayKey, or displayKeyWithPeriod if the job has multiple periods
   * @param displayKey the DisplayKey string for a DisplayKey
   * @param displayKeyWithPeriod the DisplayKey string for a DisplayKey including the PolicyPeriod
   * @param policyPeriod the quote's PolicyPeriod
   * @return the converted DisplayKey for the passed-in displayKey, or displayKeyWithPeriod if the job has multiple periods
   */
  protected function createQuoteActivityText(displayKey : String, displayKeyWithPeriod : String,
                                             policyPeriod : PolicyPeriod) : String {
    return DisplayKey.get(_job.hasMultiplePeriods() ? displayKeyWithPeriod : displayKey,
        _job.DisplayType.toLowerCase(), _job.PolicyNumberOrJobNumber, policyPeriod.BranchName)
  }

  /**
   * Returns a new Activity associated with the given PolicyPeriod, assigned to the user, and with the specified fields
   * @param pattern the ActivityPattern of the activity being created
   * @param user the assignee of the activity being created
   * @param policyPeriod
   * @param subject the text of the subject of the activity being created
   * @param description the text of the description of the activity being created
   * @return a new Activity associated with the given PolicyPeriod
   */
  protected function createActivityForRequestingUser(pattern : ActivityPattern, user : User,
                                                     policyPeriod : PolicyPeriod, subject : String, description : String) : Activity {
    var activity = pattern.createPolicyPeriodActivity(policyPeriod.Bundle, policyPeriod, subject, description, null,
        Priority.TC_NORMAL, true, null, null)
    activity.assign(user.DefaultAssignmentGroup, user)
    return activity
  }

  /**
   * Returns the Async Rate/Quote Completed ActivityPattern
   */
  protected property get QuoteCompleteActivity() : ActivityPattern {
    return ActivityPattern.finder.getActivityPatternByCode("async_quote_completed")
  }

  override property get Icon() : String {
    throw new UnsupportedOperationException("Subclass must override the Icon property")
  }
}
