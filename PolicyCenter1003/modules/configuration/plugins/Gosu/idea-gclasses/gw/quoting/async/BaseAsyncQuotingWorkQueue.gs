package gw.quoting.async

uses gw.api.locale.DisplayKey
uses gw.api.system.PLDependenciesGateway
uses gw.api.util.DisplayableException
uses gw.api.validation.EntityValidationException
uses gw.api.web.util.PCDateFormatUtil
uses gw.datatype.DataTypes
uses gw.entity.IEntityType
uses gw.i18n.DateTimeFormat
uses gw.job.JobProcessValidator
uses gw.job.QuoteHaltedException
uses gw.job.cancellation.CancellationProcessValidator
uses gw.job.uw.UWAuthorityBlocksProgressException
uses gw.pl.persistence.core.Key
uses gw.plugin.util.CurrentUserUtil
uses gw.processes.WorkQueueBase
uses gw.rating.worksheet.WorksheetUIHelper
uses org.apache.commons.lang.exception.ExceptionUtils
uses org.apache.commons.lang3.StringUtils
uses entity.BaseQuotingWorkItem
uses org.slf4j.Logger

/**
 * Abstract base class for WorkQueues to start asynchronous quoting/rating
 */
@Export
abstract class BaseAsyncQuotingWorkQueue extends WorkQueueBase<PolicyPeriod, BaseQuotingWorkItem> {

  final var _logger : Logger as readonly logger

  construct(batchProcessType: BatchProcessType, workItemType: IEntityType, aLogger: Logger) {
    super(batchProcessType, workItemType, PolicyPeriod)
    _logger = aLogger
  }

  protected static function preparePolicyPeriodForAsyncQuoting(policyPeriod: PolicyPeriod, desiredStatus: PolicyPeriodStatus) {
    policyPeriod.Status = desiredStatus
  }

  protected static function prepareWorkItem(workItem: BaseQuotingWorkItem, policyPeriod: PolicyPeriod) {
    workItem.RequestingUser = CurrentUserUtil.CurrentUser.User
    workItem.PolicyPeriod = policyPeriod
    workItem.initialize()
  }

  override function processWorkItem(item : BaseQuotingWorkItem) {
    executeAsUser(item.RequestingUser.ID, \ -> {
      gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
        var period = bundle.add(item.PolicyPeriod)
        try {
          var asyncValidator = item.PolicyPeriod.JobProcess.AsyncJobProcessValidator
          /*
           * DE4091; Clear and commit the quote issues so that if an exception occurs, there are
           * no previous issues clouding the user's view of what is the current failure.  If this is not done, then
           * an exception will trigger a rollback of this clearing of the issues.
           */
          period.clearAllAsyncQuoteIssues()
          period.Bundle.commit()
          requestQuotingOp(period, asyncValidator)
          finishProcessing(period, item.RequestingUser)
        } catch (e : UWAuthorityBlocksProgressException) {
          handleIssueException(e, period, item.RequestingUser)
          finishProcessing(period, item.RequestingUser)
        } catch (e : QuoteHaltedException) {
          logStackTraceForWorkItem(item, e)
          finishProcessing(period, item.RequestingUser)
        } catch (e : EntityValidationException) {
          //AsyncQuoteIssues on a period could be empty if prequote raises entityValidationException(eg., as in AuditProcess)
          if (item.PolicyPeriod.AsyncQuoteIssues.IsEmpty) {
            handleIssueException(e, item)
          } else {
            logStackTraceForWorkItem(item, e, true)
          }
          finishProcessing(period, item.RequestingUser)
        } catch (e : DisplayableException) {
          handleIssueException(e, item)
          finishProcessing(period, item.RequestingUser)
        } catch (e : Throwable) {
          handleIssueException(e, item)
          throw e
        }
      })
    })
  }

  /**
   * Perform tasks after an asynchronous operation.
   * If the operation was successful generate a success activity.
   * If not, set the {@link PolicyPeriodStatus} to Draft and generate a failure activity.
   */
  private function finishProcessing(period : PolicyPeriod, requestingUser : User) {
    if (checkProcessingSuccess(period)) {
      var activity = createSuccessActivityOnPeriod(period, requestingUser)
      activity.Bundle.commit()
    } else {
      try {
        logger.info(this.Class.Name +" processing for period "+period.DisplayName+" failed")

        period.Status = PolicyPeriodStatus.TC_DRAFT
        period.Bundle.commit()
      } finally {
        // Activity creation will be in a separate bundle from PolicyPeriod, just in case the PolicyPeriod has some
        // changes that prevent the bundle from committing.
        gw.transaction.Transaction.runWithNewBundle(\bundle -> {
          // Load the PolicyPeriod from the database to get the unchanged version of the PolicyPeriod.
          period = bundle.loadBean(period.ID) as PolicyPeriod
          //period.ValidRate is false but no exception was thrown during quote process
          createFailureActivity(period, requestingUser)
        }, requestingUser)
      }
    }
  }

  protected function executeAsUser(userID: Key, action()) {
    var oldToken = PLDependenciesGateway.getCommonDependencies().getServiceToken()
    var newToken = PLDependenciesGateway.getServiceTokenManager().createAuthenticatedToken(userID)
    try {
      PLDependenciesGateway.getCommonDependencies().setServiceToken(newToken)
      action()
    } finally {
      PLDependenciesGateway.getCommonDependencies().setServiceToken(oldToken)
      PLDependenciesGateway.getServiceTokenManager().removeToken(newToken);
    }
  }

  protected function handleIssueException(ex : UWAuthorityBlocksProgressException, period : PolicyPeriod, requestingUser : User ) {
    logStackTraceForWorkItem(null, ex)
    // No need to create issue message for this, because UWIssues should have already been created for this exception.
    // Just in case that's not true, we create an AsyncQuoteIssue for every UWIssue not created.
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var policyPeriod = bundle.loadBean(period.ID) as PolicyPeriod
      for (exceptionIssue in ex.BlockingIssues) {
        if (not period.UWIssuesIncludingSoftDeleted.contains(exceptionIssue)) {
          var issue = new AsyncQuoteIssue(bundle)
          issue.IssueType = AsyncQuoteIssueType.TC_ERROR
          issue.Description = trimDescription(exceptionIssue.LongDescription)
          issue.PolicyPeriod = policyPeriod
        }
      }
    }, requestingUser)
  }

  protected function handleIssueException(ex : DisplayableException, item : BaseQuotingWorkItem) {
    logStackTraceForWorkItem(item, ex)
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var issue = new AsyncQuoteIssue(bundle)
      issue.IssueType = AsyncQuoteIssueType.TC_DISPLAYABLEEXCEPTION
      issue.Description = trimDescription(ex.Message)
      issue.PolicyPeriod = bundle.loadBean(item.PolicyPeriod.ID) as PolicyPeriod
    }, item.RequestingUser)
  }

  protected function handleIssueException(throwable : Throwable, item : BaseQuotingWorkItem) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var issue = new AsyncQuoteIssue(bundle)
      issue.IssueType = AsyncQuoteIssueType.TC_DISPLAYABLEEXCEPTION
      var timestamp = PCDateFormatUtil.getOutputDateFormat(DateTimeFormat.SHORT, DateTimeFormat.SHORT).format(Date.Now)
      issue.Description = throwable.Class.SimpleName + ": " + trimDescription(throwable.Message) + System.lineSeparator()
          + DisplayKey.get("Java.Error.Web.StackTraceInLog", timestamp)
      issue.PolicyPeriod = bundle.loadBean(item.PolicyPeriod.ID) as PolicyPeriod
    }, item.RequestingUser)
  }

  protected function handleIssueException(ex: EntityValidationException, item: BaseQuotingWorkItem) {
    logStackTraceForWorkItem(item, ex, true)
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var period = bundle.loadBean(item.PolicyPeriod.ID) as PolicyPeriod
      for (message in ex.AllErrorMessages) {
        var issue = new AsyncQuoteIssue(bundle)
        issue.IssueType = AsyncQuoteIssueType.TC_ERROR
        issue.Description = trimDescription(message)
        issue.PolicyPeriod = period
      }
    }, item.RequestingUser)
  }

  protected function trimDescription(description : String) : String {
    var limit = DataTypes.get(AsyncQuoteIssue#Description.PropertyInfo).asPersistentDataType().Length
    return StringUtils.abbreviate(description, limit)
  }

  override function logStackTraceForWorkItem(workItem : BaseQuotingWorkItem, throwable : Throwable) {
    logStackTraceForWorkItem(workItem, throwable, false)
  }

  /**
   * Logs stack trace with debug level if parameter @debug is true
   * Require for not important debug messages that are not required in log file as error
   */
  function logStackTraceForWorkItem(workItem: BaseQuotingWorkItem, throwable: Throwable, debug: Boolean) {
    if (debug) {
      logger.debug(ExceptionUtils.getFullStackTrace(throwable))
    } else {
      logger.error(ExceptionUtils.getFullStackTrace(throwable))
    }
  }

  /**
   * Generates a quote failed activity.  If there is no async quote issue on the period, then add one that indicates
   * that an invalid quote was generated. If there is one or more issues on the period then we can just rely on that to
   * indicate what the issue is.
   *
   * @param period the policy period for the activity that has failed.
   * @param user the user that the activity will be generated against.
   */
  protected function createFailureActivity(period : PolicyPeriod, user : User) {
    if (period.AsyncQuoteIssues.IsEmpty and period.UWIssuesIncludingSoftDeleted.whereBlocking(UWIssueBlockingPoint.TC_BLOCKSQUOTE).IsEmpty) {
      var issue = new AsyncQuoteIssue(period.Bundle)
      issue.IssueType = AsyncQuoteIssueType.TC_INFO
      issue.Description = FailureActivityMessage
      issue.PolicyPeriod = period
      //DE4932 - Make sure that if there is one or more DiagnosticRatingWorksheets that there is a message
      if (period.Lines.hasMatch(\pl -> pl.DiagnosticRatingWorksheets.length > 0)) {
        var worksheetIssue = new AsyncQuoteIssue(period.Bundle){
            :IssueType = AsyncQuoteIssueType.TC_INFO, :PolicyPeriod = period,
            :Description = WorksheetUIHelper.determinePartialWorksheetReferenceMessage()
            }
      }
    }
    createFailureActivityOnPeriod(period, user)
  }

  /** This method is called when the work item is being flagged as failed.  It will occur after the
   * number of retries has been exceeded and the next selection found that it has exceeded the max retry times.
   * (i.e., processtime * (maxretries + 1))
   * The version here has similar behaviour to the code in finishProcessing, but it is executing in an explicit transaction.
   * Since it gets called directly when the number of retries has been exceeded, there is no need to do bundle level commits.
   *
   * @param workItem the WorkItem that has been already processed maxRetry times
   */
  override function workItemFailed(workItem : BaseQuotingWorkItem) {
    var period = workItem.PolicyPeriod
    if (checkProcessingSuccess(period)) {
      logger.info(this.Class.Name+" Retry attempts exhausted; Asynchronous operation for period" + period.DisplayName + " is successful but creating notification probably failed.")
      createSuccessActivityOnPeriod(period, workItem.RequestingUser)
    } else{
      logger.info(this.Class.Name+" Retry attempts exhausted; Asynchronous operation for period " + period.DisplayName + " failed.")
      period.unlockFromQuoting()
      createFailureActivity(period, workItem.RequestingUser)
    }
  }

  abstract protected function requestQuotingOp(period : PolicyPeriod, validator : JobProcessValidator)

  abstract protected property get FailureActivityMessage(): String

  abstract protected function createFailureActivityOnPeriod(period : PolicyPeriod, user : User)

  abstract protected function checkProcessingSuccess(period : PolicyPeriod) : boolean

  abstract protected function createSuccessActivityOnPeriod(period : PolicyPeriod, user : User) : Activity
}