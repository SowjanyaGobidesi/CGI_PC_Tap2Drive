package gw.job

uses com.guidewire.pl.web.widget.WebMessage
uses entity.Job
uses entity.PolicyLine
uses gw.api.job.JobStateException
uses gw.api.locale.DisplayKey
uses gw.api.validation.BundleValidationOption
uses gw.api.web.job.JobWizardHelper
uses gw.billing.PolicyPeriodBillingInstructionsManager
uses gw.job.uw.UWAuthorityBlocksProgressException
uses gw.quoting.async.quote.AsyncQuotingWorkQueue
uses gw.quoting.async.rate.AsyncRatingWorkQueue
uses gw.transaction.Transaction
uses gw.validation.PCValidationContext
uses gw.web.productmodel.ProductModelSyncIssueSeverity
uses gw.web.productmodel.ProductModelSyncIssueWrapper
uses pcf.JobForward

enhancement JobWizardHelperEnhancement : JobWizardHelper {

  function goToVisibleStep(period : PolicyPeriod) {
    if (!this.isStepVisitable(this.getCurrentStep())) {
      if (this.isStepVisitable("PolicyReview")) {
        this.goDirectlyToStep("PolicyReview")
      } else if (this.isStepVisitable("PolicyInfo")) {
        this.goDirectlyToStep("PolicyInfo")
      } else {
        var stepId = this.getInitialWizardStepId(period)
        this.goDirectlyToStep(stepId)
      }
    }
  }

  /**
   * Risk Analysis step could be a wizard step, or a step in the JobWizardTools Menu
   * Certain jobs do not have a Risk Analysis step.  Those jobs include
   * Audit, or Cancel or a quick quotes.  For those jobs, use the Tools menu
   * Otherwise use the Risk Analysis step in the wizard
   *
   * @param job - the Job typekey
   */
  function goToRiskAnalysisStep(job : Job) {
    if ((job.Subtype == typekey.Job.TC_AUDIT or job.Subtype == typekey.Job.TC_CANCELLATION)
        or (job.Subtype == typekey.Job.TC_SUBMISSION and (job as Submission).QuickMode)) {
      this.goToStep("RiskEvaluation")
    } else if (this.CurrentStep == "RiskAnalysis") {
      this.goToStep("RiskAnalysis")
    } else {
      // in case there are warning validations, we want to bypass the validations and go directly to RiskAnanlysis page
      this.goDirectlyToStepWithoutWidgetValidation("RiskAnalysis")
    }
  }

  /**
   * Risk Evaluation is the Risk Analysis menu item.  It should only be visible
   * for jobs that do not have a Risk analysis step in the job wizard. That included
   * Audit, or Cancel or a quick quotes
   *
   * @param job - the Job typekey
   */
  function isRiskEvaluationVisible(job : Job) : boolean {
    return job.Subtype == typekey.Job.TC_AUDIT
          or job.Subtype == typekey.Job.TC_CANCELLATION
          or (job.Subtype == typekey.Job.TC_SUBMISSION and (job as Submission).QuickMode)
  }

  /**
   * Withdraw the period's Job (in a separate Bundle) and cancel any edit changes.
   */
  function withdraw(period : PolicyPeriod) {
    withdrawInNewBundle(period)
    this.Wizard.closeWorksheets()
    if (this.Wizard.EditController.hasChangeToPersist()) {
      this.Wizard.cancel()
    } else {
      // Retire any messages currently displayed regardless of severity
      for (message in this.Wizard.getWebMessageContext().getMessages(WebMessage.Severity.Lowest)) {
        (message as WebMessage).Retired = true
      }
      this.Wizard.commit() // nothing to commit, but resets state
    }
  }

  // Calls withdrawJob on the period's job process
  function withdrawInNewBundle(period: PolicyPeriod) {
    Transaction.runWithNewBundle(\b -> {
      var p = b.loadBean(period.ID) as PolicyPeriod
      try {
        p.JobProcess.withdrawJob()
      } catch(e : JobStateException){
        // If Job failed - reload page as some change might happen to it
        period.refresh()
        throw e
      }
    })
  }

  /**
   * @param period the PolicyPeriod
   * @return the quote step appropriate for this PolicyPeriod.
   */
  function getQuoteStep(period : PolicyPeriod) : String {
    if (!period.MultiLine) {
      return "ViewQuote"
    } else {
      return "ViewMultiLineQuote"
    }
  }

  /**
   * Requests a quote by calling the requestQuote method on the associated JobProcess.  This method will always
   * first call revalidateModel to check for things like missing required fields; if that check fails it will
   * do nothing else.  Otherwise, it will save the wizard and then proceed to calling requestQuote, which will
   * perform the necessary validation before continuing on with the rest of the quote process.
   * @param policyPeriod the PolicyPeriod
   * @param nextStep ID of the wizard step to navigate to (null for the first step of the wizard)
   */
  function requestQuote(policyPeriod : PolicyPeriod, nextStep : String) {
    requestQuote(policyPeriod, nextStep, ValidationLevel.TC_QUOTABLE, RatingStyle.TC_DEFAULT)
  }

  /**
   * Requests a quote by calling the requestQuote method on the associated JobProcess.  This method will always
   * first call revalidateModel to check for things like missing required fields; if that check fails it will
   * do nothing else.  Otherwise, it will save the wizard and then proceed to calling requestQuote, which will
   * perform the necessary validation before continuing on with the rest of the quote process.
   * @param policyPeriod the PolicyPeriod
   * @param nextStep ID of the wizard step to navigate to (null for the first step of the wizard)
   * @param validationLevel the validation level used for validation before quoting
   * @param rStyle the metadata passed on for use by the rating engine
   */
  function requestQuote(policyPeriod : PolicyPeriod, nextStep : String, validationLevel : ValidationLevel, rStyle : RatingStyle) {
    var jobProcessAction = getJobProcessAction(policyPeriod.Submission.QuoteType, policyPeriod, nextStep, validationLevel, rStyle)
    doWithUWRedirect(policyPeriod, TC_BLOCKSQUOTE, false, \-> {
      jobProcessAction.preProcess()
      jobProcessAction.process()
    })
  }

  /**
   * Requests a rating by calling the requestRate method on the associated JobProcess.
   * @param policyPeriod the PolicyPeriod
   * @param nextStep ID of the wizard step to navigate to (null for the first step of the wizard)
   */
  function requestRate(policyPeriod : PolicyPeriod, nextStep : String) {
    var requestRateStep = new RequestRateStep(this, policyPeriod, nextStep)
    doWithUWRedirect(policyPeriod, TC_BLOCKSQUOTE, false, \-> {
      requestRateStep.execute()
    })
  }

  /**
   * Attempts to convert a rated policy into a bindable policy.
   */
  function requestPostRatingQuote(policyPeriod : PolicyPeriod, nextStep : String) {
    var requestPostRatingQuoteStep = new RequestPostRatingQuoteStep(this, policyPeriod, nextStep)
    doWithUWRedirect(policyPeriod, TC_BLOCKSQUOTE, false, \-> {
      requestPostRatingQuoteStep.execute()
    })
  }

  /**
   * Attempts to override the rate for a specific line.
   *
   * @param line The line you want to override the rate of.
   * @return Issues that block rating override.
   */
  function requestRatingOverride(line: PolicyLine): UWIssue[] {
    try {
      line.Branch.JobProcess.requestRatingOverride(line, this)
    } catch (e : UWAuthorityBlocksProgressException) {
      return e.BlockingIssues.where(\ issue -> issue.CurrentBlockingPoint.Priority >= UWIssueBlockingPoint.TC_BLOCKSQUOTE.Priority)
    }
    return {}
  }

  /**
   * Job-agnostic way to "finish" the Job, and promote it to the level of issuance.
   */
  function requestIssueJob(policyPeriod : PolicyPeriod) {
    // make sure we are in the current slice (not in a future one)
    policyPeriod = policyPeriod.getSlice(policyPeriod.EditEffectiveDate)
    requestIssueJob(policyPeriod, true, true)

  }

  /**
   * Job-agnostic way to "finish" the Job, and promote to the level specified by the bindAndIssue argument
   * @param bindAndIssue true if the request should both Bind and Issue, false if the request should Bind only
   * @param finishWizard true if the Wizard should complete and redirect
   */
  function requestIssueJob(policyPeriod : PolicyPeriod, bindAndIssue : boolean, finishWizard : boolean) {
    this.Wizard.closeVisibleAsyncValidationQuoteWorksheets()
    var blockingPoint : UWIssueBlockingPoint = typekey.UWIssueBlockingPoint.get(bindAndIssue ? "BlocksIssuance" : "BlocksBind")
    doWithUWRedirect(policyPeriod, blockingPoint, finishWizard, \-> {
      policyPeriod.JobProcess.issueJob(bindAndIssue)
    })
  }

  /**
   * Redirect to the Renewal Wizard, after checking for open cancellations and doing other validation.
   */
  function requestRenewRenewal(policyPeriod : PolicyPeriod) {
    doWithUWRedirect(policyPeriod, TC_BLOCKSBIND, false, \-> {
      policyPeriod.RenewalProcess.preSchedulePendingRenewal()
      pcf.RenewalWizard_RenewalPopup.push(policyPeriod.Renewal, policyPeriod)
    })
  }

  /**
   * Synchronizes the wizard state with the state of the current bundle. Usually called after custom commits in the UI.
   */
  function synchronizeWizardStateAfterRealCommit() {
    this.Wizard.EditController.commitChanges(BundleValidationOption.validateErrorsAndWarnings())
    this.Wizard.startEditing()
  }

  private function doWithUWRedirect(period : PolicyPeriod, bp : UWIssueBlockingPoint, finishWizard : boolean, jobProcessAction : block()) {
    if (this.revalidateModel()) {
      try {
        jobProcessAction()
        if (finishWizard) {
          this.Wizard.finish()
          redirectAfterBinding(TC_BINDING)
        }
      } catch (e : UWAuthorityBlocksProgressException) {
        saveDraftAndIgnoreValidation()
        //it is possible the current step is no longer visitable after the job process action
        //regress to a visible step before pushing the popup so that the "Return to ..." link doesn't lead to
        //an unavailable step
        this.regressToVisitableStep()
        pcf.UWBlockProgressIssuesPopup.push(period, this, bp, e.BlockingIssues)
      }
    }
  }

  function getJobProcessAction(type : QuoteType, policyPeriod : PolicyPeriod, nextStep : String, vLevel : ValidationLevel, rStyle : RatingStyle) : JobProcessAction {
    if (type == QuoteType.TC_QUICK and policyPeriod.PersonalAutoLineExists) {
      return new QuickQuoteJobProcessAction(this, policyPeriod, nextStep, vLevel, rStyle)
    } else {
      return new FullAppJobProcessAction(this, policyPeriod, nextStep, vLevel, rStyle)
    }
  }

  function saveDraftAndIgnoreValidation() {
    PCValidationContext.doWhileIgnoringPageLevelValidation(\-> this.Wizard.saveDraft())
  }

  function validateAndSaveDraft() {
    var jobWizard = this.Wizard
    var valid = jobWizard.reValidateModel()
    if (valid) {
      jobWizard.saveDraft()
    }
  }

  static function applyChangesToFutureBoundRenewal(policyPeriod : PolicyPeriod) {
    var results = policyPeriod.JobProcess.applyChangesToFutureBoundRenewal()
    pcf.JobForward.go(results.first().Branch.Job) // All results from same job
    for (result in results) {
      if (result.hasConflicts()) {
        // PC-30905 display the worksheet if there is an actual difference between version OR if the rootnode == null (archiving case)
        var rootNode = gw.diff.tree.DiffTree.recalculateRootNodeForPreemptionConflicts(result.Branch, result.Conflicts)
        if (rootNode == null || rootNode.NumChildren > 0) {
          pcf.ViewChangeConflictsWorksheet.goInWorkspace(result,
              DisplayKey.get("Web.Job.FuturePeriod.Conflicts.Bound.Tab", result.Branch.BranchName),
              DisplayKey.get("Web.Job.FuturePeriod.Conflicts.Bound.Title"),
              rootNode)
        }
      }
    }
  }

  static function applyChangesToFutureUnboundRenewal(policyPeriod : PolicyPeriod) {
    var results = policyPeriod.JobProcess.applyChangesToFutureUnboundRenewal()
    pcf.JobForward.go(results.first().Branch.Job) // All results from same job
    for (result in results) {
      if (result.hasConflicts()) {
        pcf.ViewChangeConflictsWorksheet.goInWorkspace(result,
            DisplayKey.get("Web.Job.FuturePeriod.Conflicts.Unbound.Tab", result.Branch.BranchName),
            DisplayKey.get("Web.Job.FuturePeriod.Conflicts.Unbound.Title"))
      }
    }
  }

  function addSyncIssueToWebMessages(issue : ProductModelSyncIssueWrapper) {
    addSyncIssueToWebMessages(issue.Severity, issue.Message)
  }

  function addSyncIssueToWebMessages(severity : ProductModelSyncIssueSeverity, msg : String) {
    switch (severity) {
      case ProductModelSyncIssueSeverity.ERROR:
        this.addErrorWebMessage(msg)
        break
      case ProductModelSyncIssueSeverity.WARNING:
        this.addWarningWebMessage(msg)
        break
      case ProductModelSyncIssueSeverity.INFO:
        this.addInfoWebMessage(msg)
        break
      default:
        throw new IllegalArgumentException("Unknown issue severity" + severity)
    }
  }

  function getInitialWizardStepId(branch : PolicyPeriod) : String {
    if (branch.ValidRate) {
      return getQuoteStep(branch)
    } else {
      return null
    }
  }

  function redirectAfterBinding(waitingStatus : PolicyPeriodStatus) {

    var branch = this.PolicyPeriod

    // If the status is still in the "waiting" state that means we're doing things asynchronous, so push to the popup
    if (branch.Status == waitingStatus) {
      pcf.PleaseBePatientPopup.push(branch, this, null, new gw.job.patience.BranchStatus(this, waitingStatus))
    } else {
      // Otherwise, we must be done, so take the appropriate action based on whether or not the action succeeded
      redirectBasedOnBranchStatus(branch, null)
    }
  }

  function redirectBasedOnBranchStatus(branch : PolicyPeriod, nextStep : String) {
    if (branch.Status == TC_QUOTING) {
      this.addInfoWebMessage(DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.Quoting"))
      this.goToVisibleStep(branch)
    } else if (branch.Status == TC_DECLINED or branch.Status == TC_WITHDRAWN) {
      pcf.JobFailedForward.go(branch.Job, branch)
    } else if (branch.Status == TC_DRAFT) {
      this.addInfoWebMessage(DisplayKey.get("Web.Wizard.QuoteReviewMessage.SoftDeclined", branch.Job.Subtype.DisplayName.toLowerCase()))
      this.goToVisibleStep(branch)
    } else if (branch.Status == TC_RATED and not branch.ValidRate) {
      this.addInfoWebMessage(DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.InvalidRate"))
      this.goToVisibleStep(branch)
    } else if (branch.Status == TC_QUOTED and not branch.ValidQuote) {
      this.addInfoWebMessage(DisplayKey.get("Web.SubmissionWizard.QuoteReviewMessage.InvalidQuote"))
      this.goToVisibleStep(branch)
    } else if (branch.Status == TC_CANCELING) {
      pcf.JobComplete.go(branch.Job, branch)
    } else if (branch.Status == TC_RESCINDED) {
      pcf.JobComplete.go(branch.Job, branch)
    } else if (nextStep == null) {
      pcf.JobComplete.go(branch.Job, branch)
    } else {
      this.goDirectlyToStep(nextStep)
      this.goToVisibleStep(branch)
    }
  }

  function convertQuickQuoteToFullApp(submissionProcess : SubmissionProcess, policyPeriod : PolicyPeriod) {
    submissionProcess.convertToFullApp()

    if (policyPeriod.PersonalAutoLineExists) {
      // avoid potential validation errors which prevents from switching to full-app
      this.Wizard.EditController.commitChanges(com.guidewire.pl.system.bundle.validation.BundleValidationOptionInternalAccess.FRIEND_ACCESSOR.access().validateNothing())
      JobForward.go(submissionProcess.Job, policyPeriod)
    } else {
      this.goToStep("PolicyInfo")
    }
  }

  function attemptNewVersion(period : PolicyPeriod, job : Job) {
    this.Wizard.saveDraft()
    if (this.revalidateModel()) {
      if (job.SideBySide) {
        gw.lob.common.SideBySideUtil.addNewSideBySidePeriod(period)
        this.Wizard.saveDraft()
        this.goToStep("SideBySide")
      } else {
        this.newPeriod()
        this.Wizard.saveDraft()
        if (!this.isStepVisitable(this.CurrentStep)) {
          this.goToStep("PolicyInfo")
        }
      }
    }
  }

  /**
   * Starts the asynchronous rate JobProcess. If validation fails, this method will exit and do nothing.
   * @param policyPeriod the PolicyPeriod
   */
  function startAsyncRateProcess(policyPeriod : PolicyPeriod){
    if (readyForAsyncQuoteOrRate()){
      AsyncRatingWorkQueue.newWorkItem(policyPeriod)
      afterAsyncWorkItemCreation()
    }
  }

  /**
   * Starts the asynchronous quote JobProcess. If validation fails, this method will exit and do nothing.
   * @param policyPeriod the PolicyPeriod
   */
  function startAsyncQuoteProcess(policyPeriod : PolicyPeriod) {
    if (readyForAsyncQuoteOrRate()){
      AsyncQuotingWorkQueue.newWorkItem(policyPeriod)
      afterAsyncWorkItemCreation()
    }
  }

  private function afterAsyncWorkItemCreation(): void {
    synchronizeWizardStateAfterRealCommit()
    this.Wizard.closeVisibleAsyncValidationQuoteWorksheets()
  }

  private function readyForAsyncQuoteOrRate(): boolean {
    this.Wizard.saveDraft()
    invalidateIterators()
    return this.revalidateModel()

  }

  /**
   * Starts the Issuance JobProcess. If validation fails, this method will exit and do nothing.
   * @param policyPeriod the PolicyPeriod
   * @param policyPeriodBillingInstructionsManager a helper class for the billing payment page
   */
  function startIssueProcess(policyPeriod : PolicyPeriod, policyPeriodBillingInstructionsManager : PolicyPeriodBillingInstructionsManager) {
    startIssueProcess(policyPeriod, policyPeriodBillingInstructionsManager, true, true)
  }

  /**
   * Starts the Issuance JobProcess. If validation fails, this method will exit and do nothing.
   * @param policyPeriod the PolicyPeriod
   * @param policyPeriodBillingInstructionsManager a helper class for the billing payment page
   * @param bindAndIssue should be true for most jobs, but may be false for (esp Submission) jobs
   *                     which distinguish bind-only from bind-and-issue.
   * @param finishWizard true if this action should finish the Wizard and redirect to another page
   */
  function startIssueProcess(policyPeriod : PolicyPeriod, policyPeriodBillingInstructionsManager : PolicyPeriodBillingInstructionsManager, bindAndIssue : boolean, finishWizard : boolean) {
    // refresh the UI bundle with policy period in DB to avoid any CDC
    this.refreshBundle()
    invalidateIterators()
    if (this.revalidateModel()) {
      // make sure we are in the current slice (not in a future one)
      if (!policyPeriod.Slice) {
        policyPeriod = policyPeriod.getSlice(policyPeriod.EditEffectiveDate)
      }
      policyPeriodBillingInstructionsManager.saveStateToPolicyPeriod(policyPeriod)
      this.requestIssueJob(policyPeriod, bindAndIssue, finishWizard)
    }
  }

  /**
   * This method gets called before Quote or Issue because those processes commit at least once (or more),
   * thus leaving many objects in a state where they have a NULL bundle. Thus, we need to force these
   * UI elements to refresh themselves from the data store so as to avoid an exception when the UI redraws.
   */
  function invalidateIterators() {
    gw.api.web.PebblesUtil.invalidateIterators(this.Wizard, gw.web.policy.RiskEvaluationPanelSetModalRow)
    gw.api.web.PebblesUtil.invalidateIterators(this.Wizard, PolicyLocation)
    gw.api.web.PebblesUtil.invalidateIterators(this.Wizard, Modifier)
  }

}
