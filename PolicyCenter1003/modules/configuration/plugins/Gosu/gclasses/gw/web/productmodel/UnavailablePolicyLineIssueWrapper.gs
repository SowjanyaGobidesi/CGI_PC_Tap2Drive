package gw.web.productmodel

uses gw.api.locale.DisplayKey
uses gw.api.web.productmodel.UnavailablePolicyLineIssue

@Export
class UnavailablePolicyLineIssueWrapper extends ProductModelSyncIssueWrapper<UnavailablePolicyLineIssue> {
  
  construct(myIssue : UnavailablePolicyLineIssue) {
    super(myIssue)
  }

  override property get BaseMessage() : String {
    return DisplayKey.get("Web.JobWizard.ProductModelSync.UnavailablePolicyLineRemoved", Issue.Pattern.DisplayName)
  }

  override property get Severity() : ProductModelSyncIssueSeverity {
    return WARNING
  }

  override property get ShouldDisplayDuringNormalSync() : boolean { return true }
  
  override property get ShouldFixDuringNormalSync() : boolean { return true }
    
  override property get ShouldDisplayDuringQuote() : boolean { return true }
  
  override property get ShouldFixDuringQuote() : boolean { return true }
}
