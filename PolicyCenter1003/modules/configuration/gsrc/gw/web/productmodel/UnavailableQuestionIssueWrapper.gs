package gw.web.productmodel

@Export
class UnavailableQuestionIssueWrapper extends ProductModelSyncIssueWrapper<gw.api.web.productmodel.UnavailableQuestionIssue> {

  construct(myIssue : gw.api.web.productmodel.UnavailableQuestionIssue) {
    super(myIssue)
  }
  
  override property get BaseMessage() : String {
    return "No message configured for UnavailableQuestionIssue"
  }

  override property get Severity() : ProductModelSyncIssueSeverity {
    return INFO
  }
  
  override property get ShouldFixDuringNormalSync() : boolean { return true }
  
  override property get ShouldDisplayDuringNormalSync() : boolean { return false }
  
  override property get ShouldFixDuringQuote() : boolean { return true }
  
  override property get ShouldDisplayDuringQuote() : boolean { return false }
}
