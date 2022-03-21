package gw.api.job

uses gw.api.domain.policy.period.PolicyPeriodStatusSets
uses entity.Activity

@Export
class SubmissionJobMethods extends JobMethodsDefaultImpl {

  construct(submission : Submission) {
    super(submission)
  }

  override property get Icon() : String {
    return "submission"
  }

  override property get AccountSyncingEnabled() : boolean {
    return true
  }

  override property get AccountSyncingIsDateAware() : boolean {
    return false
  }

  override property get Viewable() : boolean {
    return perm.Submission.view(_job)
  }

  override protected function isOpenForEditImpl(policyPeriod : PolicyPeriod) : boolean {
    return (policyPeriod.Status == TC_NEW or policyPeriod.Status == TC_DRAFT) and perm.Submission.edit(_job)
  }

  override protected function isAvailableForSideBySideEditImpl(policyPeriod : PolicyPeriod) : boolean {
    var status = policyPeriod.Status
    return (status == TC_NEW or PolicyPeriodStatusSets.SIDE_BY_SIDE_EDITABLE_STATUSES.contains(status))
        and perm.Submission.edit(_job)
  }

  override function getValidationLevelImpl(policyPeriod : PolicyPeriod) : ValidationLevel {
    return policyPeriod.Lines.first().getQuoteValidationLevel((_job as Submission).QuoteType)
  }

  override function getRatingStyleImpl(policyPeriod : PolicyPeriod) : RatingStyle {
    return policyPeriod.Lines.first().getQuoteRatingStyle((_job as Submission).QuoteType)
  }

  override property get CanUpdatePeriodDates() : boolean {
    return true
  }

  override property get CanCopyCoverages()  : boolean {
    return true
  }

  override function canViewModifiers(policyPeriod : PolicyPeriod) : boolean {
    return perm.System.viewmodifiers
  }

  override function createSuccessfulAsyncRateActivity(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Submission.Operation.RateAsync.WorkQueue.Activity.Successful.Subject",
        "Submission.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Successful.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Submission.Operation.RateAsync.WorkQueue.Activity.Successful.Description",
        "Submission.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Successful.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject, activityDescription)
  }

  override function createSuccessfulAsyncQuoteActivity(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.Successful.Subject",
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Successful.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.Successful.Description",
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Successful.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject,
        activityDescription)
  }

  override function createFailedAsyncRateActivity(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Submission.Operation.RateAsync.WorkQueue.Activity.Failed.Subject",
        "Submission.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Failed.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Submission.Operation.RateAsync.WorkQueue.Activity.Failed.Description",
        "Submission.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.Failed.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject, activityDescription)
  }

  override function createFailedAsyncQuoteActivity(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.Failed.Subject",
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Failed.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.Failed.Description",
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.Failed.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject,
        activityDescription)
  }

  override function createSuccessfulAsyncRateActivityWithWarnings(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Submission.Operation.RateAsync.WorkQueue.Activity.SuccessfulWithWarning.Subject",
        "Submission.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Submission.Operation.RateAsync.WorkQueue.Activity.SuccessfulWithWarning.Description",
        "Submission.Operation.RateAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject, activityDescription)
  }

  override function createSuccessfulAsyncQuoteActivityWithWarnings(user : User, policyPeriod : PolicyPeriod) : Activity {
    var activitySubject = createQuoteActivityText(
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.SuccessfulWithWarning.Subject",
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Subject", policyPeriod)
    var activityDescription = createQuoteActivityText(
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.SuccessfulWithWarning.Description",
        "Submission.Operation.QuoteAsync.WorkQueue.Activity.PeriodVersion.SuccessfulWithWarning.Description", policyPeriod)

    return createActivityForRequestingUser(QuoteCompleteActivity, user, policyPeriod, activitySubject,
        activityDescription)
  }
}
