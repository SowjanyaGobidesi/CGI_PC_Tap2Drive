package gw.job

uses entity.windowed.BuildingVersionList
uses gw.api.domain.financials.PCFinancialsLogger
uses gw.api.job.JobProcessLogger
uses gw.api.locale.DisplayKey
uses gw.api.profiler.PCProfilerTag
uses gw.api.rating.RatingException
uses gw.api.util.DisplayableException
uses gw.api.validation.BundleValidationOption
uses gw.api.web.job.JobWizardHelper
uses gw.coverage.CoverableCacheProxy
uses gw.forms.FormInferenceEngine
uses gw.job.uw.UWAuthorityBlocksProgressException
uses gw.job.uw.UWIssueAutomaticApprovabilityAnalyzer
uses gw.plugin.Plugins
uses gw.plugin.policyperiod.IRatingPlugin
uses gw.web.productmodel.IProductModelSyncIssueWrapper
uses gw.web.productmodel.ProductModelSyncIssueWrapper

/**
 * Encapsulates the actions taken when Quoting.  While this class is not a JobProcess, it encapsulates
 * functionality that the JobProcess subclasses share.  The JobProcess classes involve complex
 * logic that is extremely sensitive to modification.  To implement changes to out-of-the-box logic,
 * one approach is to subclass this class and override methods as needed.  This preserves the original
 * logic for reference.  This class is exported as of 4.0.2, so another approach is to
 * modify it directly.  In either case, proceed with caution.  Seemingly small changes can break the
 * jobs.
 *
 * @see JobProcess especially if you want to use an alternative QuoteProcess class
 */
@Export
class QuoteProcess {

  protected var _branch: PolicyPeriod
  protected var _callingJob: JobProcess
  var _validator: JobProcessValidator
  var _evaluator: JobProcessUWIssueEvaluator
  var _automatedProcess: boolean
  var _recalculateDepositAfterValidQuote: boolean
  var _oosSlices: entity.PolicyPeriod[]
  var _oosSliceDates: java.util.Date[]

  private var _transactions(t: Transaction): Boolean as TransactionsToInclude = \t -> t.Written

  construct(jobProcess: JobProcess) {
    _callingJob = jobProcess
    _branch = jobProcess._branch.getSlice(jobProcess._branch.EditEffectiveDate)
    _validator = jobProcess.JobProcessValidator
    _evaluator = jobProcess.JobProcessEvaluator
    _automatedProcess = jobProcess.AutomatedProcess

    _recalculateDepositAfterValidQuote = jobProcess.RecalculateDepositOnReportingAfterValidQuote
  }

  construct(jobProcess: JobProcess, jobProcessValidator: JobProcessValidator) {
    this(jobProcess)
    _validator = jobProcessValidator
  }

  /**
   * Attempts to quote, which leaves the branch in one of four possible statuses: quoting, review, draft or declined.
   * This is the equivalent of "Quote or Review."
   *
   * @param jobWizardHelper        if specified, used to add UI messages
   * @param warningsThrowException if true, warnings throw validation exceptions
   * @param valLevel               the validation level used for validation before quoting
   * @param ratingStyle            the metadata passed on for use by the rating engine
   */
  function requestQuote(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle, warningsThrowException: boolean) {
    JobProcessLogger.logInfo("Quote requested for branch " + _branch + "(Rating style: " + ratingStyle + ")")
    executePreRateStep(jobWizardHelper, valLevel, warningsThrowException)
    try {
      _branch.startQuoting()
      try {
        // Start using the cache for coverable jurisdiction and reference date
        // Assumes no changes to the policy graph during rating
        CoverableCacheProxy.enter()

        executeRateStep(jobWizardHelper, ratingStyle)
        if (_branch.ValidRate) {
          executePostRatingQuoteStep()
        }
      } finally {
        // Stop using the cache
        CoverableCacheProxy.exit()
      }
    } catch (re : RatingException) {
      throw new DisplayableException(DisplayKey.get("Java.Web.Rating.Errors.SystemErrorMessage") + re.LocalizedMessage, re)
    } catch (e: Exception) {
      PCFinancialsLogger.logError("Exception occurred during quoting: " + e.Message, e)
      _branch.markInvalidQuote()
    } finally {
      quoteFinish(jobWizardHelper)
    }
    handlePostQuoteResponse()
  }

  /**
   * Attempts to rate. Prior to rating the following operations will be performed: quote sync, validation,
   * merge, segmentation, check UW issues, removal of rating worksheets and account syncables preparation.
   * <p>
   * If successful, the branch will be in the 'rated' state.
   *
   * @param jobWizardHelper        if specified, used to add UI messages
   * @param warningsThrowException if true, warnings throw validation exceptions
   * @param valLevel               the validation level used for validation before quoting
   * @param ratingStyle            the metadata passed on for use by the rating engine
   */
  function requestRate(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, ratingStyle: RatingStyle, warningsThrowException: boolean) {
    JobProcessLogger.logInfo("Rate requested for branch " + _branch + "(Rating style: " + ratingStyle + ")")
    executePreRateStep(jobWizardHelper, valLevel, warningsThrowException)
    try {
      _branch.startQuoting()
      try {
        // Start using the cache for coverable jurisdiction and reference date
        // Assumes no changes to the policy graph during rating
        CoverableCacheProxy.enter()

        executeRateStep(jobWizardHelper, ratingStyle)
      } finally {
        // Stop using the cache
        CoverableCacheProxy.exit()
      }
    } catch (re: RatingException) {
      throw new DisplayableException(DisplayKey.get("Java.Web.Rating.Errors.SystemErrorMessage") + re.LocalizedMessage, re)
    } catch (e: Exception) {
      PCFinancialsLogger.logError("Exception occurred during rating: " + e.Message, e)
      _branch.markInvalidRate()
    } finally {
      rateFinish(jobWizardHelper)
    }
    handlePostRateResponse()
  }

  private function executePreRateStep(jobWizardHelper: JobWizardHelper, valLevel: ValidationLevel, warningsThrowException: boolean) {
    quoteSync()

    var errorMessages(list: List<IProductModelSyncIssueWrapper>)
        = \issues -> addSyncIssueWebMessages(issues, jobWizardHelper)

    // First validate period at EditEffectiveDate
    quoteValidate(valLevel, errorMessages, warningsThrowException)

    quoteMerge(jobWizardHelper, errorMessages)

    // Run segmentation rules before checking UW Issues, so if the existing UW is not valid for segment,
    // then the UW issue will block the quote.
    quoteSegmentation()

    quoteCheckUWIssues()

    _branch.QuoteHidden = true  // Precautionary, actual calculation is done in handleQuoteResponse
    quotePrepareAccountSyncables()

    quoteRemoveWorksheets()
  }

  private function executeRateStep(jobWizardHelper: JobWizardHelper, ratingStyle: RatingStyle) {
    if (jobWizardHelper != null) { // Null check to account for invocations thru batch process
      jobWizardHelper.synchronizeWizardStateAfterRealCommit()
    }
    quoteRatePeriod(ratingStyle)
    quoteCalcTransactions()
    denormalizeFinancialTotals()
    _branch.Status = TC_RATED
  }

  /**
   * requestPostRatingQuote
   * <p>
   * Attempts to execute post-rating quote process.
   *
   * @param jobWizardHelper if not null, is what's used to add UI messages to.  If null, no messages are added.
   */
  function requestPostRatingQuote(jobWizardHelper: JobWizardHelper) {
    try {
      _branch.startQuoting()
      executePostRatingQuoteStep()
    } catch (e: Exception) {
      PCFinancialsLogger.logError("Exception occurred during post-rating quote: " + e.Message, e)
      _branch.markInvalidPostRatingQuote()
    } finally {
      postRatingQuoteFinish(jobWizardHelper)
    }
    handlePostPostRatingQuoteResponse()
  }

  private function executePostRatingQuoteStep() {
    quoteInferForms()
    _branch.Status = TC_QUOTED
    _branch.markValidQuote()
  }

  private function quoteCalcTransactions() {
    using (PCProfilerTag.QUOTE_CALC_TRANSACTIONS) {
      _branch.calculateTransactions()
    }
  }

  private function quoteInferForms() {
    using (PCProfilerTag.QUOTE_INFER_FORMS) {
      FormInferenceEngine.Instance.inferPostQuoteFormsInSlices(_branch, _oosSliceDates)
    }
  }

  private function quoteFinish(jobWizardHelper: JobWizardHelper) {
    using (PCProfilerTag.QUOTE_FINISH) {
      try {
        _branch.finishQuoting()
      } catch (ex: Exception) {
        PCFinancialsLogger.logError("Exception occurred during Quote commit: " + ex.Message, ex)
        if (jobWizardHelper != null) {
          jobWizardHelper.Wizard.cancel() // rollback
        }
        _branch.markInvalidQuote()
        _branch.finishQuoting()
      }
    }
  }

  private function rateFinish(jobWizardHelper: JobWizardHelper) {
    using (PCProfilerTag.RATE_FINISH) {
      try {
        _branch.finishRating()
      } catch (ex: Exception) {
        PCFinancialsLogger.logError("Exception occurred during Rate commit: " + ex.Message, ex)
        if (jobWizardHelper != null) {
          jobWizardHelper.Wizard.cancel() // rollback
        }
        _branch.markInvalidRate()
        _branch.finishRating()
      }
    }
  }

  private function postRatingQuoteFinish(jobWizardHelper: JobWizardHelper) {
    using (PCProfilerTag.POST_RATING_QUOTE_FINISH) {
      try {
        _branch.finishPostRatingQuoting()
      } catch (ex: Exception) {
        PCFinancialsLogger.logError("Exception occurred during Post-Rating Quote commit: " + ex.Message, ex)
        if (jobWizardHelper != null) {
          jobWizardHelper.Wizard.cancel() // rollback
        }
        _branch.markInvalidPostRatingQuote()
        _branch.finishPostRatingQuoting()
      }
    }
  }

  private function quoteSync() {
    using (PCProfilerTag.QUOTE_SYNC) {
      _oosSliceDates = _branch.OOSSliceDates
      _oosSlices = _branch.getOOSSlices(_oosSliceDates)

      var locs = _branch.VersionList.PolicyLocations
      locs.allVersions<PolicyLocation>(false) // warm up the bundle and global cache
      locs.arrays<BuildingVersionList>("Buildings").allVersions<Building>(false) // warm up the bundle and global cache

      if (!_branch.Job.SideBySide) {
        using (PCProfilerTag.REMOVE_UNUSED_LOCATIONS) {
          _branch.removeUnusedLocations()
        }
      }
      _branch.removeUnusedBuildings()
      _branch.removeUnusedAnswers()
      _branch.syncComputedValues()
    }
  }

  private function quoteValidate(valLevel: ValidationLevel, errorDisplayer(issues: List<IProductModelSyncIssueWrapper>), warningsThrowException: boolean) {
    using (PCProfilerTag.QUOTE_VALIDATE) {
      _validator.validatePrimarySliceForQuote(_branch, valLevel, errorDisplayer, warningsThrowException)
    }
  }

  private function quoteMerge(jobWizardHelper: JobWizardHelper, errorDisplayer(issues: List<IProductModelSyncIssueWrapper>)) {
    using (PCProfilerTag.QUOTE_MERGE) {
      if (!_branch.New) {
        if (jobWizardHelper != null) {
          jobWizardHelper.synchronizeWizardStateAfterRealCommit()
        }
        else {
          _branch.touch()
          _branch.Bundle.commit()
        }
      }
      if (_branch.Job.OOSJob or not (_branch.Job typeis Submission)) {
        mergeDuplicateAdds(jobWizardHelper)
      }
      if (_branch.Job.OOSJob) {
        if (_branch.OOSConflicts.Count > 0) {
          throw new DisplayableException(DisplayKey.get("Web.Job.Conflict.Unresolved"))
        }
        _branch.mergeOOSChanges({})
        _branch.checkForDuplicatesInSlices(_oosSlices)
        _branch.removeOrphanedEffDatedDateRanges()
        _validator.validateOOSESlicesForQuote(_branch, errorDisplayer)
      } else {
        _branch.checkForDuplicatesInSlices(_oosSlices)  // An in-sequence job may have been out-of-sequence at one point so we still need to remove duplicates
      }
    }
  }

  private function quoteSegmentation() {
    using (PCProfilerTag.QUOTE_SEGMENTATION) {
      _branch.runSegmentationRules()
    }
  }

  private function quoteCheckUWIssues() {
    using (PCProfilerTag.QUOTE_CHECK_UW_ISSUES) {
      _evaluator.evaluateAndCheckForBlockingUWIssuesInSlices(_branch, TC_BLOCKSQUOTE, _oosSlices)
    }
  }

  private function quotePrepareAccountSyncables() {
    using (PCProfilerTag.QUOTE_PREPARE_ACCOUNT_SYNCABLES) {
      _branch.AllAccountSyncables.each(\a -> a.prepareForQuote())
    }
  }

  private function quoteRemoveWorksheets() {
    using (PCProfilerTag.QUOTE_REMOVE_WORKSHEETS) {
      _branch.clearAllWorksheets()
    }
  }

  private function quoteRatePeriod(ratingStyle: RatingStyle) {
    using (PCProfilerTag.QUOTE_RATE_PERIOD) {
      Plugins.get(IRatingPlugin).ratePeriod(_branch, ratingStyle)
    }
  }



  /**
   * After quoting, should we edit-lock a branch not currently under edit lock?
   * <p>
   * <p>Overridable by subclasses, but default behavior is to lock
   * PolicyPeriods quoted by underwriters.
   */
  protected function putBranchUnderEditLockAfterQuoting(): boolean {
    return perm.System.editlockoverride and not _automatedProcess
  }

  /**
   * For a user without perm.System.editlockoverride, release quote hidden if all issues blocking rate release for a rated
   * policy (or blocking quote release for a quoted policy) have been approved, or are auto-approvable by current user.
   */
  function attemptQuoteReleaseForNonprivilegedUser() {
      attemptQuoteReleaseForNonprivilegedUser(_branch.Status == TC_RATED ? TC_BLOCKSRATERELEASE : TC_BLOCKSQUOTERELEASE)
  }

  private function attemptQuoteReleaseForNonprivilegedUser(blockingPoint: UWIssueBlockingPoint) {
    if (_branch.EditLocked) {
      return
    }
    var currentUser = User.util.CurrentUser
    var grants = currentUser.UserAuthorityProfiles*.UWAuthorityProfile*.Grants
    var analyzer = new UWIssueAutomaticApprovabilityAnalyzer(
        _branch.UWIssuesActiveOnly.whereBlocking(blockingPoint),
        grants, blockingPoint)
    if (analyzer.RequireManualAttention.IsEmpty) {
      try {
        evaluateUWIssues(false, blockingPoint)
      } catch (e: UWAuthorityBlocksProgressException) {
        /*
         * it's okay to catch this:
         *   1. It's unlikely to occur unless someone else is editing the policy at the same time
         *   2. We were silently trying to release the quote. If the exception is thrown, it will just stay the same
         */
        JobProcessLogger.logDebug("Swallowing UWAuthorityBlocksProgressException", e)
      }
    }
  }

  private function mergeDuplicateAdds(jobWizardHelper: JobWizardHelper) {
    var beansRemoved = _branch.mergeDuplicateAdds() // do this first, because it can generate OOS conflicts
    if (jobWizardHelper != null and beansRemoved) {
      // removed beans can confuse ListView, and even
      // result in corrupted data in the bundle.  Refresh before proceeding.
      jobWizardHelper.Wizard.refreshCurrentStep()
    }
  }

  /**
   * Run UW issue eval rules before releasing the rate; raise exception if unapproved issues remain.
   * If UWAuthorityBlocksProgressException is raised, quote may also be hidden.
   */
  private function evaluatePreRateReleaseUWIssues() {
    using (PCProfilerTag.RATE_CHECK_UW_ISSUES) {
      evaluateUWIssues(TC_BLOCKSRATERELEASE)
    }
  }

  /**
   * Run UW issue eval rules before releasing the quote; raise exception if unapproved issues remain.
   * If UWAuthorityBlocksProgressException is raised, quote may also be hidden.
   */
  private function evaluatePreQuoteReleaseUWIssues() {
    using (PCProfilerTag.QUOTE_CHECK_UW_ISSUES) {
      evaluateUWIssues(TC_BLOCKSQUOTERELEASE)
    }
  }

  /**
   * Run UW issue eval rules; raise exception if unapproved issues remain.
   * If UWAuthorityBlocksProgressException is raised, quote may also be hidden.
   *
   * @param bp a specific blocking point to evaluate the UWIssue
   */
  private function evaluateUWIssues(bp: UWIssueBlockingPoint) {
      var editLocked = _branch.EditLocked                    //branch is already under edit lock
          or putBranchUnderEditLockAfterQuoting()  //branch should be put under edit lock
      evaluateUWIssues(editLocked, bp)
  }

  private function evaluateUWIssues(editLocked: boolean, blockingPoint: UWIssueBlockingPoint) {
    var quoteHidden = editLocked
    try {
      _evaluator.evaluateAndCheckForBlockingUWIssues(_branch, blockingPoint)
    } catch (e: UWAuthorityBlocksProgressException) {
      //oops. For sure, we need to leave the quote hidden
      quoteHidden = true
      throw e
    } finally {
      _branch.EditLocked = editLocked
      _branch.QuoteHidden = quoteHidden
    }
  }

  private function handlePostQuoteResponse() {
    using (PCProfilerTag.QUOTE_HANDLE_RESPONSE) {
      if (_branch.ValidQuote) {
        handleValidQuote()
      } else {
        handleInvalidQuote()
      }
    }
  }

  private function handlePostRateResponse() {
    using (PCProfilerTag.RATE_HANDLE_RESPONSE) {
      if (_branch.ValidRate) {
        handleValidRate()
      } else {
        handleInvalidRate()
      }
    }
  }

  private function handlePostPostRatingQuoteResponse() {
    using (PCProfilerTag.POST_RATING_QUOTE_HANDLE_RESPONSE) {
      if (_branch.ValidQuote) {
        handleValidPostRatingQuote()
      } else {
        handleInvalidPostRatingQuote()
      }
    }
  }

  private function handleValidQuote() {
    new JobConditions(_branch, "handle valid quote").checkNotPromoted().assertOkay()
    JobProcessLogger.logInfo("Quote for branch " + _branch + " is valid.")
    setPaymentInfoWithNewQuote()
    handleReinsurance()
    evaluatePreQuoteReleaseUWIssues()
  }

  private function handleValidRate() {
    new JobConditions(_branch, "handle valid rate").checkNotPromoted().assertOkay()
    JobProcessLogger.logInfo("Rate for branch " + _branch + " is valid.")
    evaluatePreRateReleaseUWIssues()
  }

  private function handleValidPostRatingQuote() {
    new JobConditions(_branch, "handle valid post-rating quote").checkNotPromoted().assertOkay()
    JobProcessLogger.logInfo("Post-rating quote for branch " + _branch + " is valid.")
    setPaymentInfoWithNewQuote()
    handleReinsurance()
    evaluatePreQuoteReleaseUWIssues()
  }

  private function handleInvalidQuote() {
    new JobConditions(_branch, "handle invalid quote").checkNotPromoted().assertOkay()
    JobProcessLogger.logInfo("Quote for branch " + _branch + " is not valid.")
    _branch.edit()
  }

  private function handleInvalidRate() {
    new JobConditions(_branch, "handle invalid rate").checkNotPromoted().assertOkay()
    JobProcessLogger.logInfo("Rate for branch " + _branch + " is not valid.")
    _branch.edit()
  }

  private function handleInvalidPostRatingQuote() {
    new JobConditions(_branch, "handle invalid post-rating quote").checkNotPromoted().assertOkay()
    JobProcessLogger.logInfo("Post-rating quote for branch " + _branch + " is not valid.")
    _branch.rollbackToRated()
  }

  private function denormalizeFinancialTotals() {
    using (PCProfilerTag.QUOTE_DENORM_FINANCIALS) {
      var allCosts = _branch.AllCosts
      _branch.TotalCostRPT = allCosts.AmountSum(_branch.PreferredSettlementCurrency)
      _branch.TotalPremiumRPT = allCosts.Premiums.AmountSum(_branch.PreferredSettlementCurrency)
      _branch.TaxSurchargesRPT = allCosts.TaxSurcharges.AmountSum(_branch.PreferredSettlementCurrency)
      var writtenTransactions = _branch.AllTransactions.where(TransactionsToInclude)
      _branch.TransactionCostRPT = writtenTransactions.AmountSum(_branch.PreferredSettlementCurrency)
      _branch.TransactionPremiumRPT = writtenTransactions.toSet().Premiums.AmountSum(_branch.PreferredSettlementCurrency)
    }
  }

  private function addSyncIssueWebMessages(issues: List<IProductModelSyncIssueWrapper>, jobWizardHelper: JobWizardHelper) {
    if (jobWizardHelper != null) {
      for (i in issues) {
        if ((i as ProductModelSyncIssueWrapper).ShouldDisplayDuringQuote) {
          jobWizardHelper.addSyncIssueToWebMessages(i as ProductModelSyncIssueWrapper)
        }
      }
    }
  }

  private function setPaymentInfoWithNewQuote() {
    using (PCProfilerTag.QUOTE_SETPAYMENTINFO) {
      try {
        _branch.JobProcess.setPaymentInfoWithNewQuote()
      } catch (e: Exception) {
        // set payment plans fail should not prevent quote
        JobProcessLogger.logError(DisplayKey.get("Web.BillingAdjustmentsDV.Error.SetInstallmentsPlansDownPaymentInstmntTotal", e.Message), e)
      }
    }
  }

  private function handleReinsurance() {
    using (PCProfilerTag.QUOTE_HANDLE_REINSURANCE) {
      _branch.ValidReinsurance = true // if we find a problem, we will change this below.
      // if creating reinsurables fails, we still want to keep the quote
      try {
        _branch.createReinsurables()
      } catch (e: Exception) {
        JobProcessLogger.logError(DisplayKey.get("Web.Reinsurance.Error.InvalidReinsurance", e.Message), e)
        _branch.ValidReinsurance = false
        throw new DisplayableException(DisplayKey.get("Web.Reinsurance.Error.InvalidReinsurance", e.Message))
      }

      try {
        _branch.createRIRisks()
      } catch (e: Exception) {
        JobProcessLogger.logError(DisplayKey.get("Web.Reinsurance.Error.InvalidRIRisk", e.Message))
        _branch.ValidReinsurance = false
        throw new DisplayableException(DisplayKey.get("Web.Reinsurance.Error.InvalidRIRisk", e.Message))
      }
    }
  }
}
