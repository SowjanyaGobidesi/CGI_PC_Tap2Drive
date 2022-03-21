package gw.job.uw

@Export
class RiskApprovalDetailsPopupAsst {
  private construct() {}  //not instantiable

  public static function doAfterCommit(issues : UWIssue[]) {
    var period = issues[0].PolicyPeriod  //guaranteed to be at least one issue being approved
    
    issues.each(\ issue -> issue.createApprovalHistoryFromCurrentValues())
    if (not perm.System.editlockoverride) {
      period.JobProcess.attemptQuoteReleaseForNonprivilegedUser()
    }
    period.Policy.Bundle.commit()
  }

}
