package gw.web.productmodel

uses gw.api.locale.DisplayKey
uses gw.api.web.productmodel.MissingPolicyLineIssue

@Export
class MissingPolicyLineIssueWrapper extends ProductModelSyncIssueWrapper<gw.api.web.productmodel.MissingPolicyLineIssue> {
  
  construct(myIssue : MissingPolicyLineIssue) {
    super(myIssue)
  }

  override property get BaseMessage() : String {
    return DisplayKey.get("Web.JobWizard.ProductModelSync.MissingPolicyLineAdded", Issue.Pattern.DisplayName)
  }

  override property get Severity() : ProductModelSyncIssueSeverity {
    return INFO
  }

  override property get ShouldFixDuringNormalSync() : boolean { return false }
  
  override property get ShouldDisplayDuringNormalSync() : boolean { return false }
  
  override property get ShouldFixDuringQuote() : boolean { return false }
  
  override property get ShouldDisplayDuringQuote() : boolean { return false }
}
