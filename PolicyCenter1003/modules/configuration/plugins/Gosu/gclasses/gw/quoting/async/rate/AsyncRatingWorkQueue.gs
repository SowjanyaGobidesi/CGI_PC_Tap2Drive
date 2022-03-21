package gw.quoting.async.rate

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.job.JobProcessValidator
uses gw.pl.persistence.core.Bundle
uses gw.pl.util.ArgCheck
uses gw.quoting.async.BaseAsyncQuotingWorkQueue
uses entity.AsyncRatingWorkItem

/**
 * WorkQueue to start asynchronous rating. This workqueue creates AsyncRatingWorkItems for PolicyPeriods that are
 * to be rated asynchronously. The work items are created explicitly by calling newWorkItem(PolicyPeriod).
 */
@Export
class AsyncRatingWorkQueue extends BaseAsyncQuotingWorkQueue {

  construct() {
    super(BatchProcessType.TC_ASYNCRATING, AsyncRatingWorkItem, PCLoggerCategory.ASYNC_RATING)
  }

  /**
   * @return a {@link AsyncRatingWorkItem} for the given PolicyPeriod.
   */
  static function newWorkItem(policyPeriod : PolicyPeriod) : AsyncRatingWorkItem {
    ArgCheck.nonNull(PolicyPeriod, "policyPeriod")

    if (policyPeriod.Status != PolicyPeriodStatus.TC_DRAFT) {
      throw new DisplayableException(DisplayKey.get("AsyncRating.Job.Status.Error", policyPeriod.Status))
    }

    if (not policyPeriod.JobProcess.canRequestAsyncRate().Okay) {
      throw new DisplayableException(DisplayKey.get("Java.Rating.Async.Error.AsyncRatingNotEnabled"))
    }

    var bundle = policyPeriod.Bundle
    BaseAsyncQuotingWorkQueue.preparePolicyPeriodForAsyncQuoting(policyPeriod, PolicyPeriodStatus.TC_RATEREQUESTED)
    var item = new AsyncRatingWorkItem(bundle)
    BaseAsyncQuotingWorkQueue.prepareWorkItem(item, policyPeriod)
    bundle.commit()
    return item
  }

  override function createWorkItem(target : PolicyPeriod, b : Bundle) : BaseQuotingWorkItem {
    return newWorkItem(target)
  }

  override function requestQuotingOp(period : PolicyPeriod, validator : JobProcessValidator) {
    period.JobProcess.requestRate(null, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, false, validator)
  }

  override function checkProcessingSuccess(period: PolicyPeriod): boolean {
    return period.ValidRate
  }

  override function createSuccessActivityOnPeriod(period: PolicyPeriod, user: User): Activity {
    return period.createRateSuccessfulActivity(user)
  }

  override property get FailureActivityMessage() : String {
    return DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.InvalidRate")
  }

  override function createFailureActivityOnPeriod(period : PolicyPeriod, user: User) {
    period.createRateFailedActivity(user)
  }
}