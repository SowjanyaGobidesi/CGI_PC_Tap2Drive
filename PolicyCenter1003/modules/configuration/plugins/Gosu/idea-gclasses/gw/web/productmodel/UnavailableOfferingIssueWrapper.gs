package gw.web.productmodel

uses gw.api.locale.DisplayKey

/**
 * Wrapper for unavailable offering issues. These issues are always automatically fixed and displayed.
 */
@Export
class UnavailableOfferingIssueWrapper extends ProductModelSyncIssueWrapper<gw.api.web.productmodel.UnavailableOfferingIssue> {

  construct(myIssue : gw.api.web.productmodel.UnavailableOfferingIssue) {
    super(myIssue)
  }
  
  override property get BaseMessage() : String {
    if (Issue.Fixed) {
      return DisplayKey.get("Web.JobWizard.ProductModelSync.UnavailableOfferingRemoved", Issue.Offering)
    } else {
      return DisplayKey.get("Web.JobWizard.ProductModelSync.UnavailableOffering", Issue.Offering)
    }
  }

  override property get Severity() : ProductModelSyncIssueSeverity {
    return Issue.Fixed ? WARNING : ERROR
  }
  
  override property get ShouldFixDuringNormalSync() : boolean { return true }
  
  override property get ShouldDisplayDuringNormalSync() : boolean { return true }
  
  override property get ShouldFixDuringQuote() : boolean { return false }
  
  override property get ShouldDisplayDuringQuote() : boolean { return true }

}
