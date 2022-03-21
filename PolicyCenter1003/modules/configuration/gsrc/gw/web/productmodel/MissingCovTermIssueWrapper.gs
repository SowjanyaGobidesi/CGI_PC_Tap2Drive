package gw.web.productmodel

uses gw.api.locale.DisplayKey

/**
 * Wrapper class for missing cov term issues.  This class is notable in that the issue won't be
 * fixed at quote time (and will be displayed), since we want to force
 * the user to select an appropriate value rather than silently taking the default.
 * During a normal sync, the issue will automatically be fixed and won't be displayed.
 */
@Export
class MissingCovTermIssueWrapper extends ProductModelSyncIssueWrapper<gw.api.web.productmodel.MissingCovTermIssue> {

  construct(myIssue : gw.api.web.productmodel.MissingCovTermIssue) {
    super(myIssue)
  }
  
  override property get BaseMessage() : String {
    if (Issue.Fixed) {
      return DisplayKey.get("Web.JobWizard.ProductModelSync.MissingCovTermAdded", Issue.Pattern.DisplayName, Issue.Pattern.ClausePattern.DisplayName)
    } else {
      return DisplayKey.get("Web.JobWizard.ProductModelSync.MissingCovTermNotAdded", Issue.Pattern.DisplayName, Issue.Pattern.ClausePattern.DisplayName)
    }  
  }

  override property get Severity() : ProductModelSyncIssueSeverity {
    if (Issue.Fixed) {
      return INFO  
    } else {
      return ERROR
    }
  }
  
  override property get ShouldFixDuringNormalSync() : boolean { return true }

  override property get ShouldDisplayDuringNormalSync() : boolean { return true }
  
  override property get ShouldFixDuringQuote() : boolean { return false }

  override property get ShouldDisplayDuringQuote() : boolean { return true }
}
