package gw.quoting.async.quote

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.job.JobProcessValidator
uses gw.pl.persistence.core.Bundle
uses gw.pl.util.ArgCheck
uses gw.quoting.async.BaseAsyncQuotingWorkQueue
uses entity.BaseQuotingWorkItem

/**
 * WorkQueue to start asynchronous quoting. This workqueue creates AsyncQuotingWorkItems for PolicyPeriods that are
 * to be quoted asynchronously. The work items are created explicitly by calling newWorkItem(PolicyPeriod).
 */
@Export
class AsyncQuotingWorkQueue extends BaseAsyncQuotingWorkQueue {

  construct() {
    super(BatchProcessType.TC_ASYNCQUOTING, AsyncQuotingWorkItem, PCLoggerCategory.ASYNC_QUOTING)
  }

  /**
   * @return a {@link AsyncQuotingWorkItem} for the given PolicyPeriod.
   */
  static function newWorkItem(policyPeriod: PolicyPeriod) : AsyncQuotingWorkItem {
    ArgCheck.nonNull(PolicyPeriod, "policyPeriod")

    if (policyPeriod.Status != PolicyPeriodStatus.TC_DRAFT) {
      throw new DisplayableException(DisplayKey.get("AsyncQuoting.Job.Status.Error", policyPeriod.Status))
    }

    if (not policyPeriod.JobProcess.canRequestAsyncQuote().Okay) {
      throw new DisplayableException(DisplayKey.get("Java.Quoting.Async.Error.AsyncQuotingNotEnabled"))
    }

    var bundle = policyPeriod.Bundle
    BaseAsyncQuotingWorkQueue.preparePolicyPeriodForAsyncQuoting(policyPeriod, PolicyPeriodStatus.TC_QUOTEREQUESTED)
    var item = new AsyncQuotingWorkItem(bundle)
    BaseAsyncQuotingWorkQueue.prepareWorkItem(item, policyPeriod)
    bundle.commit()
    return item
  }

  override function createWorkItem(target : PolicyPeriod, b : Bundle) : BaseQuotingWorkItem {
    return newWorkItem(target)
  }

  override function requestQuotingOp(period : PolicyPeriod, validator : JobProcessValidator) {
    period.JobProcess.requestQuote(null, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT, false, validator)
  }

  override function checkProcessingSuccess(period: PolicyPeriod): boolean {
    return period.ValidQuote
  }

  override function createSuccessActivityOnPeriod(period: PolicyPeriod, user: User): Activity {
    return period.createQuoteSuccessfulActivity(user)
  }

  override property get FailureActivityMessage() : String {
    return DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.InvalidQuote")
  }

  override function createFailureActivityOnPeriod(period : PolicyPeriod, user: User) {
    period.createQuoteFailedActivity(user)
  }
}