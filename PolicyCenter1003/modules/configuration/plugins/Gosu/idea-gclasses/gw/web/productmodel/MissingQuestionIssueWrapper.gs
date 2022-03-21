package gw.web.productmodel

@Export
class MissingQuestionIssueWrapper extends ProductModelSyncIssueWrapper<gw.api.web.productmodel.MissingQuestionIssue> {

  construct(myIssue : gw.api.web.productmodel.MissingQuestionIssue) {
    super(myIssue)
  }
  
  override property get BaseMessage() : String {
    return "No message configured for MissingQuestionIssue"
  }

  override property get Severity() : ProductModelSyncIssueSeverity {
    return INFO
  }
  
  override property get ShouldFixDuringNormalSync() : boolean { return true }
  
  override property get ShouldDisplayDuringNormalSync() : boolean { return false }
  
  override property get ShouldFixDuringQuote() : boolean { return true }
  
  override property get ShouldDisplayDuringQuote() : boolean { return false }
}
