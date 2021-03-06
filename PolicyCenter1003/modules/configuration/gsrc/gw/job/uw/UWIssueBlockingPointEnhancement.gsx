package gw.job.uw
uses gw.api.locale.DisplayKey
uses java.util.Collections
uses java.util.List

enhancement UWIssueBlockingPointEnhancement : typekey.UWIssueBlockingPoint {

  /**
   * Get all blocking points, ordered from earliest to latest.
   */
  static property get All() : List<UWIssueBlockingPoint> {
    return UWIssueBlockingPoint.getTypeKeys(false).orderByDescending(\ bp -> bp.Priority)
  }

  /**
   * The next blocking point after this.
   */
  property get Next() : UWIssueBlockingPoint{
    return UWIssueBlockingPoint.All.earliestAfter(this)
  }
  
  /**
   * The previous blocking point before this.
   */
  property get Previous() : UWIssueBlockingPoint{
    return UWIssueBlockingPoint.All.latestBefore(this)
  }

  /**
   * A display value expressed as "Through X" rather than "Blocks Y".
   * 
   * <p>E.g., assuming "BlocksIssuance" is immediately preceded by "BlocksBind", 
   * ("BlocksIssuance").DisplayAsThroughValue == "Through Bind".
   */
  property get DisplayAsThroughValue() : String {
    switch (this) {
      case TC_BLOCKSQUOTE : return DisplayKey.get("Web.UWIssue.ThroughValue.None")
      case TC_BLOCKSRATERELEASE : return DisplayKey.get("Web.UWIssue.ThroughValue.Quote")
      case TC_BLOCKSQUOTERELEASE : return DisplayKey.get("Web.UWIssue.ThroughValue.RateRelease")
      case TC_BLOCKSBIND : return DisplayKey.get("Web.UWIssue.ThroughValue.QuoteRelease")
      case TC_BLOCKSISSUANCE : return DisplayKey.get("Web.UWIssue.ThroughValue.Bind")
      case TC_NONBLOCKING : return DisplayKey.get("Web.UWIssue.ThroughValue.Issuance")
      default : return null
    }
  }

  /**
   * For blocking point other than "NonBlocking" return a warning message appropriate
   * to whether the issue will block bind or issuance.
   */
  property get QuoteScreenFutureIssuesWarnings() : List<String> {
    if (this.Priority >= UWIssueBlockingPoint.TC_BLOCKSBIND.Priority) {
      return {DisplayKey.get("Web.SubmissionWizard.QuoteScreen.FutureBlockAtBind")}
    }
    if (this.Priority >= UWIssueBlockingPoint.TC_BLOCKSISSUANCE.Priority) {
      return {DisplayKey.get("Web.SubmissionWizard.QuoteScreen.FutureBlockAtIssuance")}
    }
    return Collections.emptyList<String>()
  }

  function comesAfter(referenceBp : UWIssueBlockingPoint) : boolean {
    return this.Priority < referenceBp.Priority
  }

  function comesBefore(referenceBp : UWIssueBlockingPoint) : boolean {
    return this.Priority > referenceBp.Priority
  }

}
