package gw.web.productmodel

uses gw.api.locale.DisplayKey

/**
 * Wrapper for unavailable policy term issues. This issue is always automatically fixed and displayed.
 */
@Export
class UnavailablePolicyTermIssueWrapper extends ProductModelSyncIssueWrapper<gw.api.web.productmodel.UnavailablePolicyTermIssue> {

  construct(myIssue : gw.api.web.productmodel.UnavailablePolicyTermIssue) {
    super(myIssue)
  }
  
  override property get BaseMessage() : String {    
    return DisplayKey.get("Web.JobWizard.ProductModelSync.SelectedPolicyTermModified", Issue.PolicyTerm, Issue.NewPolicyTerm)
  }

  override property get Severity() : ProductModelSyncIssueSeverity {
    return INFO
  }
  
  override property get ShouldFixDuringNormalSync() : boolean { return true }
  
  override property get ShouldDisplayDuringNormalSync() : boolean { return true }
  
  override property get ShouldFixDuringQuote() : boolean { return true }
  
  override property get ShouldDisplayDuringQuote() : boolean { return true }

}
