package gw.web.job

uses entity.Activity
uses entity.Job
uses gw.api.locale.DisplayKey
uses gw.api.system.PCConfigParameters
uses gw.api.web.PebblesUtil
uses gw.api.web.job.JobWizardHelper
uses pcf.AsyncQuoteValidationAuditWorksheet
uses pcf.AsyncQuoteValidationCancellationWorksheet
uses pcf.AsyncQuoteValidationIssuanceWorksheet
uses pcf.AsyncQuoteValidationPolicyChangeWorksheet
uses pcf.AsyncQuoteValidationReinstatementWorksheet
uses pcf.AsyncQuoteValidationRenewalWorksheet
uses pcf.AsyncQuoteValidationRewriteNewAccountWorksheet
uses pcf.AsyncQuoteValidationRewriteWorksheet
uses pcf.AsyncQuoteValidationSubmissionWorksheet
uses pcf.AuditWizard
uses pcf.CancellationWizard
uses pcf.IssuanceWizard
uses pcf.PolicyChangeWizard
uses pcf.QuickSubmissionWizard
uses pcf.ReinstatementWizard
uses pcf.RenewalWizard
uses pcf.RewriteNewAccountWizard
uses pcf.RewriteWizard
uses pcf.SubmissionWizard
uses pcf.UWBlockProgressIssuesPopup
uses pcf.api.Location

/**
 * Helper functions to Job UI elements
 */
@Export
class JobUIHelper {

  /**
   * List of different types of quotes
   */
  public static enum QuoteType {
    Quote,        // Synchronous single-step quoting
    AsyncQuote,   // Asynchronous single-step quoting
    Rate,         // First step of synchronous two-step quoting
    AsyncRate,    // First step of asynchronous two-step quoting
    FinishQuote,   // Syncrohous post-rate finish quote of two-step quoting
    QuickQuote   // Quick Quote
  }

  /**
   * Mapper to allow the issue level to be sorted by async quote issue severity
   */
  internal static final var ISSUE_TYPE_SEVERITY_MAPPER : Map<AsyncQuoteIssueType, Integer> = {
      AsyncQuoteIssueType.TC_ERROR -> 1,
      AsyncQuoteIssueType.TC_WARNING -> 2,
      AsyncQuoteIssueType.TC_INFO -> 3,
      AsyncQuoteIssueType.TC_DISPLAYABLEEXCEPTION -> 4
  }

  /**
   * Determines whether "Resolve with future bound periods" is shown on the
   * job complete screen
   */
  public static function showResolveWithFutureBoundPeriods(policyPeriod : PolicyPeriod) : boolean {
    if (policyPeriod.JobProcess.applyChangeToFutureRenewalAutomatic()) return false
    return policyPeriod.JobProcess.canApplyChangesToFutureBoundRenewal()
  }

  /**
   * Determines whether "Resolve with future unbound periods" is shown on the
   * job complete screen
   */
  public static function showResolveWithFutureUnboundPeriods(policyPeriod : PolicyPeriod) : boolean {
    if (policyPeriod.JobProcess.applyChangeToFutureRenewalAutomatic()) return false
    return policyPeriod.JobProcess.canApplyChangesToFutureUnboundRenewal()
  }

  /**
   * Determines whether to display the link "View your Policy (policy-number)" on the
   * screen shown when a job is complete
   */
  public static function showViewPolicy(policyPeriod : PolicyPeriod) : boolean {
    if (policyPeriod.Job typeis Submission) {
      if (!policyPeriod.isPromoted()) return false
      if (policyPeriod.Status == PolicyPeriodStatus.TC_DECLINED) return false
      if (policyPeriod.Status == PolicyPeriodStatus.TC_WITHDRAWN) return false
      if (policyPeriod.Status == PolicyPeriodStatus.TC_NOTTAKEN) return false
    }
    if (policyPeriod.Job typeis RewriteNewAccount) {
      if (!policyPeriod.isPromoted()) return false
      if (policyPeriod.Status == PolicyPeriodStatus.TC_WITHDRAWN) return false
    }
    // filter out nonexistent/temporary policy instances
    return policyPeriod.PolicyNumberAssigned
  }

  /**
   * Determines whether to display the link "View your {job}" on the screen shown
   * when a job is complete
   */
  public static function showViewJob(policyPeriod : PolicyPeriod) : boolean {
    if (policyPeriod.Job typeis Submission) return true
    if (policyPeriod.Job typeis Issuance) return true
    if (policyPeriod.Job typeis Renewal) return true
    if (policyPeriod.Job typeis Audit) return true
    if (policyPeriod.Job typeis RewriteNewAccount) return true
    return false
  }

  /**
   * Determines whether "Go to Submission Manager" should be displayed on the
   * job complete screen
   */
  public static function showGoToSubmissionManager(policyPeriod : PolicyPeriod) : boolean {
    if (policyPeriod.Job typeis Submission) return true
    if (policyPeriod.Job typeis Issuance) return true
    return false
  }

  /**
   * Determines whether "Submit application for different account" should be displayed on the
   * job complete screen
   */
  public static function showSubmitAnother(policyPeriod : PolicyPeriod) : boolean {
    if (policyPeriod.Job typeis Submission) return true
    if (policyPeriod.Job typeis Issuance) return true
    return false
  }

  /**
   * Determines whether "Review Changes" is shown on the job complete screen
   */
  public static function showReviewChanges(policyPeriod : PolicyPeriod) : boolean {
    if (policyPeriod.Job typeis Rewrite) return true
    if (policyPeriod.Job typeis PolicyChange) return true
    return false
  }

  /**
   * Compiles a string "View your {job-type}({job-number})" to be displayed on the
   * job complete screen
   */
  public static function viewJobText(job : Job) : String {
    if (job typeis Submission) return DisplayKey.get("Web.SubmissionComplete.ViewSubmission", job.JobNumber)
    if (job typeis Issuance) return DisplayKey.get("Web.IssuanceComplete.ViewIssuance", job.JobNumber)
    if (job typeis Renewal) return DisplayKey.get("Web.Renewal.Complete.ViewRenewal", job.JobNumber)
    if (job typeis RewriteNewAccount)
      return DisplayKey.get("Web.RewriteNewAccountComplete.ViewRewriteNewAccount", job.JobNumber)
    if (job typeis Audit) return DisplayKey.get("Web.AuditComplete.ViewAudit",
        job.AuditInformation.AuditScheduleType.DisplayName.toLowerCase(), job.JobNumber)
    return ""
  }

  /**
   * Takes user to first wizardStep of SubmissionWizard/QuickSubmissionWizard based on the QuoteType,
   * advances a submission in the "New" state to "Draft".  If Asynchronous quote is requested for a
   * period with blocking UWIssues, takes user to SubmissionWizard's UWBlockProgressIssuesPopup.
   */
  public static function goToSubmissionWizard(submission : Submission, policyPeriod : PolicyPeriod, wizardStep : String, activity : Activity) {
    if (policyPeriod.Status == TC_NEW) {
      policyPeriod.SubmissionProcess.beginEditing()
      submission.Bundle.commit()
    }
    var quoteType = submission.QuoteType
    if (quoteType == typekey.QuoteType.TC_QUICK and policyPeriod.Policy.Product.QuickerQuickQuoteAllowed) {
      QuickSubmissionWizard.go(submission, policyPeriod)
    } else {
      var wizardLocation = SubmissionWizard.go(submission, policyPeriod, wizardStep)
      handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
    }
  }

  /**
   * Determines if a period can be rated (first step of 2 step quote process)
   */
  public static function showRateButton(policyPeriod : PolicyPeriod) : boolean {
    return policyPeriod.JobProcess.canRequestRate().checkDraft().Okay
        and isTwoStepQuotingAvailableAndEnabled(policyPeriod)
        and not showAsyncRateButton(policyPeriod)
  }

  /**
   * Returns true if the PolicyPeriod can be quoted after a rating
   */
  public static function showPostRateButton(policyPeriod : PolicyPeriod) : boolean {
    return policyPeriod.JobProcess.canRequestPostRatingQuote().Okay
        and not showAsyncQuoteButton(policyPeriod)
  }

  /**
   * Determines if a period can be quoted synchronously
   */
  public static function showQuoteButton(policyPeriod : PolicyPeriod) : boolean {
    return policyPeriod.JobProcess.canRequestQuote().checkDraft().Okay
        and not showAsyncQuoteButton(policyPeriod)
  }

  /**
   * Determines if a period can be rated asynchronously.
   */
  public static function showAsyncRateButton(policyPeriod : PolicyPeriod) : boolean {
    return policyPeriod.JobProcess.canRequestAsyncRate().checkDraft().Okay
        and isTwoStepQuotingAvailableAndEnabled(policyPeriod)
        and policyPeriod.ShouldQuoteAsynchronously
  }

  private static function isTwoStepQuotingAvailableAndEnabled(policyPeriod: PolicyPeriod) : boolean {
    return PCConfigParameters.TwoStepQuotingEnabled.Value
        and policyPeriod.TwoStepQuotingAvailable
  }

  /**
   * Determines if a period can be quoted asynchronously.
   */
  public static function showAsyncQuoteButton(policyPeriod : PolicyPeriod) : boolean {
    return policyPeriod.JobProcess.canRequestAsyncQuote().checkDraft().Okay
        and policyPeriod.ShouldQuoteAsynchronously
  }

  /**
   * Returns true if the status of the policy period indicates that a quote request is in progress.  The policy
   * period is not refreshed from the database.  To do that, call
   * {@link JobWizardHelper#reloadPolicyPeriodIfAsyncQuoteComplete(PolicyPeriod)}
   * @param policyPeriod the policy period to check
   * @return true if it is in a status that indicates it is being quoted.
   */
  public static function isQuoteRequestInProgress(policyPeriod : PolicyPeriod) : boolean {
    return JobWizardHelper.isQuoteRequestInProgress(policyPeriod)
  }

  /**
   * Takes user to first step of PolicyChangeWizard. If Asynchronous quote is requested for a
   * period with blocking UWIssues, takes user to PolicyChangeWizard's UWBlockProgressIssuesPopup.
   */
  public static function goToPolicyChangeWizard(policyChange : PolicyChange, policyPeriod : PolicyPeriod, activity : Activity) {
    var wizardLocation = PolicyChangeWizard.go(policyChange, policyPeriod)
    handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
  }

  public static function goToIssuanceWizard(issuance : Issuance, policyPeriod : PolicyPeriod, activity : Activity) {
    var wizardLocation = IssuanceWizard.go(issuance, policyPeriod)
    handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
  }


  public static function goToReinstatementWizard(reinstatement : Reinstatement, policyPeriod : PolicyPeriod, activity : Activity) {
    var wizardLocation = ReinstatementWizard.go(reinstatement, policyPeriod)
    handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
  }

  public static function goToRewriteWizard(rewrite : Rewrite, policyPeriod : PolicyPeriod, wizardStep : String, activity : Activity) {
    var wizardLocation = RewriteWizard.go(rewrite, policyPeriod, wizardStep)
    handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
  }

  public static function goToRewriteNewAccountWizard(rewriteNewAccount : RewriteNewAccount, policyPeriod : PolicyPeriod, wizardStep : String, activity : Activity) {
    var wizardLocation = RewriteNewAccountWizard.go(rewriteNewAccount, policyPeriod, wizardStep)
    handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
  }

  public static function goToCancellationWizard(cancellation : Cancellation, policyPeriod : PolicyPeriod, activity : Activity) {
    var wizardLocation = CancellationWizard.go(cancellation, policyPeriod)
    if (activity.AsynchronousQuoteCompleted) {
      handleRenderingUWIssuesOnJobWizardStep(policyPeriod, wizardLocation)
      handleRenderingDisplayableExceptionsForAsyncQuote(policyPeriod, wizardLocation)
      handleRenderingAsyncQuoteIssuesOnWorkSheet(policyPeriod)
    }
  }

  public static function getQuoteTypeForSubmission(policyPeriod: PolicyPeriod): QuoteType {
    if (policyPeriod.Submission.QuickerQuickQuote and not policyPeriod.ValidQuote and policyPeriod.isActive()) {
      return QuoteType.QuickQuote
    } else {
      return getQuoteType(policyPeriod)
    }
  }

  public static function getQuoteType(policyPeriod: PolicyPeriod): QuoteType {
    if (showAsyncRateButton(policyPeriod)) {
      return QuoteType.AsyncRate
    } else if (showRateButton(policyPeriod)) {
      return QuoteType.Rate
    } else if (showAsyncQuoteButton(policyPeriod)) {
      return QuoteType.AsyncQuote
    } else if (showQuoteButton(policyPeriod)) {
      return QuoteType.Quote
    } else if (showPostRateButton(policyPeriod)) {
      return QuoteType.FinishQuote
    } else {
      // To handle the case when the quote button should not be available.
      // For example, when the policy period is in rated or quoted status.
      return null
    }
  }

  /**
   * Handles the rendering of UWIssues raised as part of AsyncQuote process failure. The UWIssues are
   * shown on the UWBlockProgressIssuesPopup
   */
  private static function handleRenderingUWIssuesOnJobWizardStep(policyPeriod : PolicyPeriod, location : Location) {
    var uwIssues = policyPeriod.UWIssuesIncludingSoftDeleted.whereBlocking(UWIssueBlockingPoint.TC_BLOCKSQUOTE)
    if (!uwIssues.IsEmpty) {
      UWBlockProgressIssuesPopup.push(policyPeriod, new gw.api.web.job.JobWizardHelper(location.CurrentLocation), UWIssueBlockingPoint.TC_BLOCKSQUOTE, uwIssues)
    }
  }

  public static function goToRenewalWizard(renewal : Renewal, policyPeriod : PolicyPeriod, wizardStep : String, activity : Activity) {
    var wizardLocation = RenewalWizard.go(renewal, policyPeriod, wizardStep)
    handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
  }

  public static function goToAuditWizard(audit: Audit, policyPeriod: PolicyPeriod, activity: Activity) {
    var wizardLocation = AuditWizard.go(audit, policyPeriod)
    if (activity.AsynchronousQuoteCompleted) {
      var jobWizardHelper = new gw.api.web.job.JobWizardHelper(wizardLocation.CurrentLocation)
      if (jobWizardHelper.isStepVisitable("Premiums")) {
        jobWizardHelper.goDirectlyToStep("Premiums")
      } else {
        jobWizardHelper.goDirectlyToStep("Summary")
      }
      handleAsyncQuoteIssues(activity, policyPeriod, wizardLocation)
    }
  }

  /**
   * Handles the rendering of AsyncQuoteValidationIssues as part of the AsyncQuote process. The asyncQuote validation
   * issues are shown on a separate tab on the web worksheet
   */
  private static function handleRenderingAsyncQuoteIssuesOnWorkSheet(policyPeriod : PolicyPeriod) {
    var validationIssues = policyPeriod.AsyncQuoteIssues.where(\issue -> issue.IssueType.isOneOf({AsyncQuoteIssueType.TC_ERROR,
            AsyncQuoteIssueType.TC_INFO, AsyncQuoteIssueType.TC_WARNING}))
    if (not validationIssues.IsEmpty) {
      var location = goToAppropriateValidationWorksheet(policyPeriod)
      // Sort the validation issues so that the more severe issues are first.  If issues have the same severity, then the
      // issue sequence is used.
      validationIssues.sort(\issue1, issue2 -> {
        if (issue1.IssueType == issue2.IssueType) {
          return issue1.IssueSequence < issue2.IssueSequence
        }
        return ISSUE_TYPE_SEVERITY_MAPPER[issue1.IssueType] < ISSUE_TYPE_SEVERITY_MAPPER[issue2.IssueType]
      })

      validationIssues.each(\vMsg -> {
        switch (vMsg.IssueType) {
          case AsyncQuoteIssueType.TC_ERROR:
            PebblesUtil.addWebErrorMessages(location, {vMsg.Description})
            break;
          case AsyncQuoteIssueType.TC_WARNING:
            PebblesUtil.addWebMessages(location, {vMsg.Description})
            break;
          case AsyncQuoteIssueType.TC_INFO:
            PebblesUtil.addWebInfoMessages(location, {vMsg.Description})
            break;
        }
      })
    }
  }

  /**
   * Go to the appropriate validation worksheet based on the policyPeriod's job.  Return the resulting location.
   * @param policyPeriod the policy period we are displaying.
   * @return the location.
   */
  private static function goToAppropriateValidationWorksheet(policyPeriod : PolicyPeriod) : Location {
    var location : Location
    switch(typeof(policyPeriod.Job)) {
      case Audit:
        location = AsyncQuoteValidationAuditWorksheet.goInWorkspace(policyPeriod)
        break
      case Cancellation:
        location = AsyncQuoteValidationCancellationWorksheet.goInWorkspace(policyPeriod)
        break
      case Issuance:
        location = AsyncQuoteValidationIssuanceWorksheet.goInWorkspace(policyPeriod)
        break
      case PolicyChange:
        location = AsyncQuoteValidationPolicyChangeWorksheet.goInWorkspace(policyPeriod)
        break
      case Reinstatement:
        location = AsyncQuoteValidationReinstatementWorksheet.goInWorkspace(policyPeriod)
        break
      case Renewal:
        location = AsyncQuoteValidationRenewalWorksheet.goInWorkspace(policyPeriod)
        break
      case RewriteNewAccount:
        location = AsyncQuoteValidationRewriteNewAccountWorksheet.goInWorkspace(policyPeriod)
        break
      case Rewrite:
        location = AsyncQuoteValidationRewriteWorksheet.goInWorkspace(policyPeriod)
        break
      case Submission:
        location = AsyncQuoteValidationSubmissionWorksheet.goInWorkspace(policyPeriod)
        break
      default:
        throw new UnsupportedOperationException("Job type " + typeof(policyPeriod.Job) + " is not currently supported")
    }
    return location
  }

  /**
   * Handles the rendering of Displayable exceptions as part of AsyncQuote failure. The Displayable
   * exceptions are shown on the top of first visitable wizard step of a job.
   */
  private static function handleRenderingDisplayableExceptionsForAsyncQuote(policyPeriod : PolicyPeriod, location : Location) {
    var issues = policyPeriod.AsyncQuoteIssues.where(\issue -> issue.IssueType == AsyncQuoteIssueType.TC_DISPLAYABLEEXCEPTION)
    issues.each(\issue -> PebblesUtil.addUserDisplayableWebMessages(location, issue.Description))
  }

  /**
   * Handles rendering of AsyncQuoteIssues on JobWizard location
   */
  private static function handleAsyncQuoteIssues(activity : Activity, policyPeriod : PolicyPeriod, wizardLocation : Location) {
    if (activity.AsynchronousQuoteCompleted) {
      handleRenderingUWIssuesOnJobWizardStep(policyPeriod, wizardLocation)
      handleRenderingDisplayableExceptionsForAsyncQuote(policyPeriod, wizardLocation)
      handleRenderingAsyncQuoteIssuesOnWorkSheet(policyPeriod)
    }
  }
}