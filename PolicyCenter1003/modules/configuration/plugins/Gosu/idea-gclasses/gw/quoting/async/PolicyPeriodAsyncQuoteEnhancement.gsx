package gw.quoting.async

uses entity.Activity
uses gw.pl.util.ArgCheck

/**
 * Enhancement for asynchronous quoting on PolicyPeriod.
 */
enhancement PolicyPeriodAsyncQuoteEnhancement : entity.PolicyPeriod {

  /**
   * @param user the assigned user of the Activity to be created
   * @return an {@link Activity} indicating an asynchronous rate has completed successfully,
   * or null if {@link AsyncQuoteIssue}s exist which prevent the successful asynchronous rate.
   */
  function createRateSuccessfulActivity(user : User) : Activity {
    ArgCheck.nonNull(user, "User")

    if (HasWarningAndMaybeInfoIssuesOnly) {
      return this.Job.createSuccessfulAsyncRateActivityWithWarnings(user, this)
    } else if (this.AsyncQuoteIssues.IsEmpty or HasInfoIssueOnly) {
      return this.Job.createSuccessfulAsyncRateActivity(user, this)
    } else {
      return null
    }
  }

  /**
   * @param user the assigned user of the Activity to be created
   * @return an {@link Activity} indicating an asynchronous quote has completed successfully,
   * or null if {@link AsyncQuoteIssue}s exist which prevent the successful asynchronous quote.
   */
  function createQuoteSuccessfulActivity(user : User) : Activity {
    ArgCheck.nonNull(user, "User")

    if (HasWarningAndMaybeInfoIssuesOnly) {
      return this.Job.createSuccessfulAsyncQuoteActivityWithWarnings(user, this)
    } else if (this.AsyncQuoteIssues.IsEmpty or HasInfoIssueOnly) {
      return this.Job.createSuccessfulAsyncQuoteActivity(user, this)
    } else {
      return null
    }
  }

  /**
   * @param user the assigned user of the Activity to be created
   * @return an {@link Activity} indicating an asynchronous quote has failed
   */
  function createRateFailedActivity(user : User) : Activity {
    ArgCheck.nonNull(user, "User")
    return this.Job.createFailedAsyncRateActivity(user, this)
  }

  /**
   * @param user the assigned user of the Activity to be created
   * @return an {@link Activity} indicating an asynchronous quote has failed
   */
  function createQuoteFailedActivity(user : User) : Activity {
    ArgCheck.nonNull(user, "User")
    return this.Job.createFailedAsyncQuoteActivity(user, this)
  }

  /**
   * Clears the {@link AsyncQuoteIssue}s on the PolicyPeriod
   */
  function clearAllAsyncQuoteIssues() {
    this.AsyncQuoteIssues.each(\issue -> issue.remove())
  }

  /**
   * Returns true if the PolicyPeriod's AsyncQuoteIssues has one or more with issue type WARNING and
   * all other issue types are either WARNING or INFO
   * @return true if the above condition is met, otherwise false
   */
  private property get HasWarningAndMaybeInfoIssuesOnly() : boolean{
    return this.AsyncQuoteIssues.hasMatch(\issue -> issue.IssueType == AsyncQuoteIssueType.TC_WARNING) and
        this.AsyncQuoteIssues.allMatch(\quoteIssue -> quoteIssue.IssueType == AsyncQuoteIssueType.TC_WARNING or
            quoteIssue.IssueType == AsyncQuoteIssueType.TC_INFO)
  }

  private property get HasInfoIssueOnly() : boolean {
    return this.AsyncQuoteIssues.allMatch(\issue -> issue.IssueType == AsyncQuoteIssueType.TC_INFO)
  }


  /**
   * Determines if a period should be rated/quoted asynchronously.
   */
  property get ShouldQuoteAsynchronously() : boolean {
    return this.Lines.hasMatch(\line -> line.shouldQuoteAsynchronously())
  }
}
