package gw.quoting.async.quote

enhancement AsyncQuotingActivityEnhancement: Activity {

  property get AsynchronousQuoteCompleted() : boolean {
    return this.ActivityPattern.Code == "async_quote_completed"
  }
}
