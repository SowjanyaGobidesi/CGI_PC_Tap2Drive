package gw.job

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException

enhancement RenewalEnhancement : Renewal {

  function hasOpenCancellationInPriorPeriod() : boolean {
    var openCancellations = this.Policy.OpenJobs.whereTypeIs( Cancellation )
    return openCancellations.hasMatch( \ job -> not job.PolicyPeriod.PeriodEnd.after(this.LatestPeriod.PeriodStart) )
  }

  /**
   * This is only meant to be used in the scenario where a cancelled policy has future renewal that need to be withdrawn
   * Renewal can be withdrawn if Renewal notification has not been sent
   * else if there is enough time for non-renewal notifications documents to be sent, withdraw and send non renewal documents
   * else raise a block-binding UWIssue
   */
  function withdrawOrSetNonRenewal() : boolean {
    var isWithdrawn = true
    if (this.RenewalNotifDate == null) { // if renewal docs were not sent
      this.withdraw() // withdraws all active periods in the job
    } else { // renewal docs were sent for a selected version
      if (this.NonRenewalNotifDate == null && this.SelectedVersion.RenewalProcess.canNonRenew()) { // if selected version can be non-renewed
        this.SelectedVersion.RenewalProcess.withdrawWithoutCheckingConditions() // note: withdraw() requires null RenewalNotificationDate, but we want to override for policy cancellation
        this.SelectedVersion.addEvent("SendNonRenewalDocuments") // note: sending nonrenewal docs but renewal in withdrawn status
        this.NonRenewalNotifDate = Date.CurrentDate
      } else {
        isWithdrawn = false // selected version is not withdrawn
      }

      // block all periods not withdrawn. including the non-selected ones to incase someone "selects" them and tries to bind
      this.ActivePeriods.each(\period -> blockWithUWIssue(period))
    }
    return isWithdrawn
  }

  private function blockWithUWIssue(period : PolicyPeriod) {
    var issue = new UWIssue(period);
    issue.setIssueKey("UW1ReviewBlocksBind");
    issue.setActive(true);
    issue.setShortDescription(DisplayKey.get("Cancellation.FuturePeriod.UWIssue.Subject", period.PolicyNumber))
    issue.setLongDescription(DisplayKey.get("Cancellation.FuturePeriod.UWIssue.Description", period.Job.JobNumber, period.PolicyNumber))
    issue.setApprovalBlockingPoint(TC_BLOCKSBIND)
    var issueType = UWIssueType.finder.findUWIssueTypeByCheckingSet(TC_MANUAL)?.firstWhere(\issueType -> issueType.Code == "UW1ReviewBlocksBind")
    if (issueType == null) {
      throw new DisplayableException(DisplayKey.get("Cancellation.FuturePeriod.Error.UWIssueTypeNotFound", "UW1ReviewBlocksBind", period.PolicyNumber))
    }
    issue.setIssueType(issueType)
    period.addToUWIssuesIncludingSoftDeleted(issue)
  }

  /**
   * Determines if any other periods for the renewal is in renewing, non-renewing, or not-taking states.
   */
  function hasAnotherPendingPeriod(period : PolicyPeriod) : boolean {
    return this.Periods.hasMatch( \ policyPeriod -> policyPeriod != period and hasPendingStatus(policyPeriod) )
  }

  /**
   * Given a Renewal job, this method groups it into the appropriate Renewal group
   * or creates a new one if a valid group does not exist.
   *
   * See the comments on Enhancement for an explanation of the timeWindow parameter
   * and the core grouping algorithm.
   */
  function addToGroup() {
    var group = this.findJobGroupWithinWindow(entity.RenewalGroup, -1)
    if (group == null) {
      group = new RenewalGroup(this)
      this.initializeGroup(group, "RG")
    }
    group.addJob(this)
  }

  // ---------------------------------------------------------- Private methods

  private function hasPendingStatus(branch : PolicyPeriod) : boolean {
    return branch.Status == TC_RENEWING or branch.Status == TC_NONRENEWING or branch.Status == TC_NOTTAKING
  }
}
