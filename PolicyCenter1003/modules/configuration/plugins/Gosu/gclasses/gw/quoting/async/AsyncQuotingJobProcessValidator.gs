package gw.quoting.async

uses gw.job.JobProcessValidator
uses gw.web.productmodel.IProductModelSyncIssueWrapper
uses gw.web.productmodel.ProductModelSyncIssueSeverity
uses gw.web.productmodel.ProductModelSyncIssueWrapper

@Export
class AsyncQuotingJobProcessValidator extends JobProcessValidator {
  // Maintain a sequence so that the inserted records can have their order maintained.
  private var _sequence : int = 0

  //Use a Mapper here because ProductModelSyncIssueSeverity is ENUM instead of Typelist
  internal static final var ISSUE_TYPE_MAPPER : Map<ProductModelSyncIssueSeverity, AsyncQuoteIssueType> = {
      ProductModelSyncIssueSeverity.WARNING -> AsyncQuoteIssueType.TC_WARNING,
      ProductModelSyncIssueSeverity.ERROR -> AsyncQuoteIssueType.TC_ERROR,
      ProductModelSyncIssueSeverity.INFO -> AsyncQuoteIssueType.TC_INFO
  }

  override function validatePrimarySliceForQuote(branch : PolicyPeriod, valLevel : ValidationLevel, errorDisplayer(issues : List<IProductModelSyncIssueWrapper>), warningsThrowException : boolean) {
    super.validatePrimarySliceForQuote(branch, valLevel, \ issues -> generateAsyncQuoteIssue(branch, issues), warningsThrowException)
  }

  override function validatePeriodForUI(branch : PolicyPeriod, level : ValidationLevel, warningsThrowException : boolean) {
    var context = validatePeriod(branch, level)
    var result = context.Result

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var period = bundle.loadBean(branch.ID) as PolicyPeriod

      for (errorMsg in result.ErrorMessagesOnly) {
        generateAsyncQuoteIssue(errorMsg, period, AsyncQuoteIssueType.TC_ERROR)
      }

      for (warningMsg in result.WarningMessagesOnly) {
        generateAsyncQuoteIssue(warningMsg, period, AsyncQuoteIssueType.TC_WARNING)
      }
    })

    if (result.hasErrors()) {
      context.raiseExceptionIfProblemsFound()
    }
  }

  private function generateAsyncQuoteIssue(msg : String, period : PolicyPeriod, issueType : AsyncQuoteIssueType) {
    var message = new AsyncQuoteIssue(period.Bundle)
    message.IssueType = issueType
    message.Description = msg
    message.PolicyPeriod = period
    _sequence = _sequence + 1
    message.IssueSequence = _sequence
  }

  private function generateAsyncQuoteIssue(branch : PolicyPeriod, issues : List<IProductModelSyncIssueWrapper>) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var period = bundle.loadBean(branch.ID) as PolicyPeriod
      issues.each(\issue -> {
        if((issue as ProductModelSyncIssueWrapper).ShouldDisplayDuringQuote) {
          generateAsyncQuoteIssue(issue.Message, period, ISSUE_TYPE_MAPPER[(issue as ProductModelSyncIssueWrapper).Severity])
        }
      })
    })
  }

}