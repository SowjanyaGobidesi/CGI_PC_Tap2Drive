package gw.policy

uses gw.api.domain.account.AccountSyncable
uses gw.api.locale.DisplayKey
uses entity.windowed.LocationAnswerVersionList
uses entity.windowed.TerritoryCodeVersionList
uses gw.api.domain.FKLoader
uses gw.api.policy.period.OrphanedEffDatedRanges
uses gw.api.productmodel.ProductLookup
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.util.JurisdictionMappingUtil
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.api.validation.ValidationResult
uses gw.lob.common.AnswerValidation
uses gw.plugin.Plugins
uses gw.plugin.account.IAccountSyncablePlugin
uses gw.plugin.billing.BillingAccountSearchCriteria
uses gw.plugin.billing.BillingAccountSearchResult
uses gw.plugin.exchangerate.IFXRatePlugin
uses gw.plugin.reinsurance.IReinsurancePlugin
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil

uses java.lang.Exception
uses java.util.Date
uses java.util.Map
uses gw.api.upgrade.Coercions

@Export
class PolicyPeriodValidation extends PCValidationBase implements IPolicyPeriodValidation {

  var _policyPeriod : PolicyPeriod as Period
  var _jobtypesRequiringBillingValidation = {typekey.Job.TC_SUBMISSION, typekey.Job.TC_RENEWAL, typekey.Job.TC_REWRITE, typekey.Job.TC_REWRITENEWACCOUNT}

  static final var _quoteRelatedThreshold = ValidationLevel.TC_QUOTABLE

  construct(valContext : PCValidationContext, branch : PolicyPeriod) {
    super(valContext)
    Period = branch
  }

  /**
   * This is a handy way to initiate full validation of the policy period.
   *
   * Note: Do not remove this method.
   */
  static function validatePeriod(branch : PolicyPeriod, level : ValidationLevel) : ValidationResult {
    var context = ValidationUtil.createContext(level)
    new PolicyPeriodValidation(context, branch).validate()
    return context.Result
  }

  static function validateForAudit(branch : PolicyPeriod, level : ValidationLevel) : PCValidationContext {
    var context = ValidationUtil.createContext(level)
    new PolicyPeriodValidation(context, branch).validateForAudit()
    return context
  }

  function validateForAudit() {
    if (not (Period.Job typeis Audit)) {
      throw "validateForAudit() should only be called on Audit jobs"
    }
    checkFinalAuditScheduledBeforeCompletingPremiumReport()
    checkFinalAuditNotCompleteOrQuotedIfTryingToCompletePremiumReport()
    Period.Lines.each(\line -> validateLine(line, \validator -> validator.validateForAudit()))
  }

  /**
   * Validate the Policy Period
   *
   * Checks the following:
   * <ul>
   *   <li>Effdateds on the period have no orphaned ranges</li>
   *   <li>Period dates are valid</li>
   *   <li>Quote dates are valid</li>
   *   <li>Product is valid</li>
   *   <li>Quote has at least minimal data</li>
   *   <li>Producer Code of Service is valid</li>
   *   <li>Billing information is valid</li>
   *   <li>Reporting policy is created with final audit</li>
   *   <li>Official IDs valid</li>
   *   <li>Underwriting company valid</li>
   *   <li>Answers are valid</li>
   *   <li>Policy contact roles are valid</li>
   *   <li>Policy Locations has valid territory codes</li>
   *   <li>Lines are valid</li>
   *   <li>Uniquely keyed beans have no duplicates</li>
   *   <li>Named insured industry codes are valid</li>
   *   <li>Policy Location industry codes are valid</li>
   *   <li>Reinsurance for bindable period are valid</li>
   *   <li>Policy Address is valid</li>
   *   <li>Modifiers are valid</li>
   *   <li>Coverage and Settlement currencies are compatible</li>
   * </ul>
   */
  override protected function validateImpl() {
    if (not Context.addToVisited(this, "validateImpl")) {
      return
    }
    checkForOrphanedEffDatedRanges()
    checkPeriodDates()
    checkQuoteNeededDate()
    checkProductIsValid()
    checkOrganizationTypeIsValid()
    checkMinimumDataForQuote()
    checkProducerCodeOfServiceIsValid()
    checkProducerCodeOfRecordIsConfiguredForSettlementCurrency()
    checkAgencyBillIsConfiguredForSettlementCurrency()
    checkBillingInformation()
    checkReportingPolicyIsCreatedWithFinalAudit()
    checkOfficialIDs()
    checkUnderwritingCompany()
    checkAnswers()
    checkAffinityGroupProductCode()
    checkAffinityGroupProducerCode()
    checkAllPaymentsAreInTheSameCurrency()
    checkAccountSyncablesHaveTheSameAccountAndPolicyValues()
    Period.VersionList.PolicyContactRoles.allVersions<PolicyContactRole>(false) // warm up the bundle and global cache
    var policyContactRoles = Period.PolicyContactRoles
    policyContactRoles.each(\role -> new PolicyContactRoleValidation(Context, role).validate())
    var pcrsByContact = policyContactRoles.partition(\pcr -> pcr.AccountContactRole.AccountContact.Contact)
    pcrsByContact.Values.each(\roles -> new PolicyContactRoleForSameContactValidation(Context, roles).validate())
    new NonPrimaryNamedInsuredContactValidation(Context, policyContactRoles).validate()
    var locs = Period.PolicyLocations
    var locVLs = locs.toList().map(\ loc -> loc.VersionList)
    locVLs.arrays<TerritoryCodeVersionList>("TerritoryCodes") // warm up the bundle and global cache
    if (not Period.Job.NewTerm) {
      FKLoader.preLoadFKs(locs.toList(), TerritoryCode)
    }
    locVLs.arrays<LocationAnswerVersionList>("LocationAnswers")
    var validatedTerritoryCodes : Map<Map<String, Object>, String> = {}
    locs.each(\ loc -> new PolicyLocationValidation(Context, loc, validatedTerritoryCodes).validate())
    Period.Lines.each(\ line -> validateLine(line, \ validator -> validator.validate()))
    checkUniqueKeyBeansHaveNoDuplicates()
    checkNamedInsuredIndustryCode()
    checkPolicyLocationIndustryCode()
    checkReinsuranceForBindablePeriod()
    checkPolicyAddress()
    var modifiers = Period.AllModifiables*.Modifiers
    modifiers.each(\ m -> new ModifierValidation(Context, m).validate() )
    checkCoverageAndSettlementCurrenciesCompatible()
    checkBaseState()
    new InvariantValidation(Context, Period).validate()
  }

  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private function checkAccountSyncablesHaveTheSameAccountAndPolicyValues() {
    if (Context.isAtLeast(ValidationLevel.TC_BINDABLE)) {
      try {
        if (Period.Job.AccountSyncingEnabled) {
          Period.AllAccountSyncables.each( \aSync -> validateAccountSyncable(aSync))
        }
      } catch (e : DisplayableException) {
        Result.addError(Period, TC_BINDABLE, e.getLocalizedMessage())
      }
    }
  }

  private function validateAccountSyncable(accountSyncable : AccountSyncable) {
    Plugins.get(IAccountSyncablePlugin).refreshAccountInformation(accountSyncable)
    accountSyncable.validateAccountAndPolicyEntityFields()
  }

  private function validateLine(line: PolicyLine, validationMethod(validator : PolicyLineValidation)) {
    var validator = line.createPolicyLineValidation(Context)
    if (validator != null) {
      validationMethod(validator)
    }
  }

  /**
   * Verifies that this period does not overlap with any other in force period
   */
  private function checkPeriodDates() {
    try {
      Period.checkForOverlapsAndGaps()
    } catch (e: DisplayableException) {
      Result.addError(Period, TC_DEFAULT, e.getMessage())
    }
    var errorMessageForRewriteDateCheck : String = null
    errorMessageForRewriteDateCheck = validatePeriodEndDoesNotOverlapRewrittenNewAccountPolicy(Period)
    if (errorMessageForRewriteDateCheck != null) {
      Result.addError(Period, TC_DEFAULT, errorMessageForRewriteDateCheck)
    }
    errorMessageForRewriteDateCheck = validateDateForRewriteNewAccount(Period)
    if (errorMessageForRewriteDateCheck != null) {
      Result.addError(Period, TC_DEFAULT, errorMessageForRewriteDateCheck)
    }
  }

  /**
   * Verifies that dateQuoteNeeded is less than the period end date
   */
  private function checkQuoteNeededDate() {
    if (Context.isAtLeast(_quoteRelatedThreshold)) {
      if (Period.Submission != null && Period.Submission.DateQuoteNeeded < Date.Today) {
        Result.addWarning(Period, _quoteRelatedThreshold, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.DateQuoteNeededHasPassed", Period.Submission.DateQuoteNeeded.formatDate(MEDIUM)))
      }
    }
  }

  /**
   * Checks that information on policy period itself is sufficient for quoting.
   */
  private function checkMinimumDataForQuote() {
    Context.addToVisited(this, "checkMinimumDataForQuote")

    if (Context.isAtLeast(_quoteRelatedThreshold)) {
      var lines = Period.Lines
      if (lines.IsEmpty) {
        Result.addError(Period, _quoteRelatedThreshold, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoLines"))
      }
      for (line in lines) {
        if (line.Subtype.Code != "WorkersCompLine") {
          if (line.AllCoverages.IsEmpty) {
            Result.addError(Period, _quoteRelatedThreshold, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoCoverages", line.Subtype.DisplayName))
          }
        }
      }
    }
  }

  private function checkAltBillingAccount() {
    if (Period.BillingMethod == TC_LISTBILL) {
      if (Period.AltBillingAccountNumber == null) {
        Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoAltBillingAccount"))
      } else if (!isAlternateBillerValidForListBill(Period.AltBillingAccountNumber, Period.PreferredSettlementCurrency)) {
        Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.AltBillingAccountInvalidForBillingMethod", Period.BillingMethod))
      }
    } else if (Period.AltBillingAccountNumber != null and !isAlternateBillerValidForDirectBill(Period.AltBillingAccountNumber, Period.PreferredSettlementCurrency)) {
      Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.AltBillingAccountInvalidForBillingMethod", Period.BillingMethod))
    }
    if (Period.Policy.Account.AccountNumber == Period.AltBillingAccountNumber) {
      Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.AltBillingAccountCannotBeOwning"))
    }
  }

  private function isAlternateBillerValidForListBill(accountNumber : String, currency : Currency) : boolean {
    try {
      // For list bill, the alternate biller must be an existing list bill account
      var results = searchForAlternateBillerInBillingSystem(accountNumber, currency, /*isListBill=*/true)
      return results != null and !results.IsEmpty
    } catch (e : Exception) {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error("Problem checking accounts in billing system, failing validation", e)
      return false
    }
  }

  private function isAlternateBillerValidForDirectBill(accountNumber : String, currency : Currency) : boolean {
    try {
      // For direct bill, the alternate biller must be either a new account or a non-list bill account.
      // Specifying ListBill=false in the search criteria does not restrict the results to only non-list bill
      // accounts, so we have to explicitly check that the returned account is not for list bill.
      var results = searchForAlternateBillerInBillingSystem(accountNumber, currency, /*isListBill=*/false)
      return results == null or results.IsEmpty or results.allMatch(\ account -> !account.isListBill(currency))
    } catch (e : Exception) {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error("Problem checking accounts in billing system, failing validation", e)
      return false
    }
  }

  private function searchForAlternateBillerInBillingSystem(accountNumber : String, currency : Currency, isListBill : boolean) : BillingAccountSearchResult[] {
    var search = new BillingAccountSearchCriteria() {
      :AccountNumber = accountNumber,
      :ListBill = isListBill,
      :Currency = currency
    }
    return search.doSearch()
  }

  private function checkInvoiceStreams() {
    if (Period.BillingMethod == TC_DIRECTBILL) {
      if (Period.CustomBilling) {
        var selectedInvoiceStream = Period.SelectedInvoiceStream
        var invoicingInterval = Period.InvoiceStreamCode == null ? Period.NewInvoiceStream.Interval
            : selectedInvoiceStream.Interval
        if (invoicingInterval == null) {
          Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoInvoiceStream"))
        } else {
          // validate invoice stream selection
          var isReponsive = Period.InvoiceStreamCode == null ?
              Period.NewInvoiceStream.PaymentMethod == TC_RESPONSIVE
              : selectedInvoiceStream.PaymentMethod == TC_RESPONSIVE
          if (not Period.AllowResponsive and isReponsive) {
            Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.InvalidInvoiceStream.SendInvoice", Period.SelectedPaymentPlan.Name))
          }
          if (Period.PaymentFrequency != invoicingInterval) {
            Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.InvalidInvoiceStream.Interval", invoicingInterval))
          }
          if (Period.NewInvoiceStream.PaymentMethod == null and Period.InvoiceStreamCode == null) {
            Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoPaymentMethod"))
          }
        }
      }

      if (Period.NewInvoiceStream != null and Period.NewInvoiceStream.PaymentInstrumentID != null) {
        try {
          if (!Period.AvailablePaymentInstruments.hasMatch(\paymentInstument -> paymentInstument.PublicID.equals(Period.NewInvoiceStream.PaymentInstrumentID))) {
            Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.PaymentInstrumentNoValid"))
          }
        } catch (e: Exception) {
          Result.addWarning(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.BillingSystemUnavailable"))
        }
      }
    }
  }

  private function checkBillingMethod() {
    if (Period.BillingMethod == null) {
      Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoBillingPlan"))
    }
    if (!Period.AvailableBillingMethods.contains(Period.BillingMethod)) {
      Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.InvalidBillingMethod", Period.BillingMethod))
    }
  }

  private function checkPaymentPlan() {
    var selectedPaymentPlan = Period.SelectedPaymentPlan
    if (selectedPaymentPlan == null) {
      Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoPaymentPlan"))
    }
    if (selectedPaymentPlan.BillingId == null) {
      Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.InvalidPaymentPlan", selectedPaymentPlan))
    }
    if (selectedPaymentPlan.IsReportingPlan and selectedPaymentPlan.ReportingPatternCode == null) {
      Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoReportingPlan"))
    }
  }

  /**
   * Checks that branch has sufficient billing and payment information for binding.
   */
  private function checkBillingInformation() {
    Context.addToVisited(this, "requireBillingPlanAndPaymentPlan")
    if (Context.isAtLeast(TC_BINDABLE) and requiresBillingAndPaymentPlan()) {
      checkBillingMethod()
      checkPaymentPlan()
      checkAltBillingAccount()
      checkInvoiceStreams()
    }
  }

  // Billing and payment plans are required for all jobs except bind-only submissions
  private function requiresBillingAndPaymentPlan() : boolean {
    if (not _jobtypesRequiringBillingValidation.contains(Period.Job.Subtype)) {
      return false
    }
    var submission = Period.Submission
    return (submission == null)
        or (submission.BindOption == BindOption.TC_BINDONLY)
        or (submission.BindOption == BindOption.TC_BINDANDISSUE)
  }


  private function checkOfficialIDs() {
    Context.addToVisited(this, "checkOfficialIDs")
    var linePatterns = Period.Lines*.Pattern

    var states = Period.Lines*.CoveredStates.toSet()
    if (Context.isAtLeast(TC_BINDABLE)) {
      // check official IDs for each covered state
      for (covstate in states) {
        var checkOfficialIDs = Period.getNamedInsuredOfficialIDsForState(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(covstate))
            .where(\id -> id typeis PCOfficialID and linePatterns.contains(id.Pattern.PolicyLinePattern))
        for (officialID in checkOfficialIDs) {
          officialID.validateOfficialID(Period, Result)
        }
      }
    }
  }

  private function checkUnderwritingCompany() {
    Context.addToVisited(this, "checkUnderwritingCompany")
    if (Period.UWCompany == null) {
      // An underwriting company needs to be set for the policy.
      Result.addError(Period, _quoteRelatedThreshold, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoValidUnderwritingCompany"))
    } else {
      // Verify that the UW Company underwrites all the states in the policy
      var valids = Period.getUWCompaniesForStates(true)
      if (not valids.contains(Period.UWCompany)) {
        Result.addError(Period, _quoteRelatedThreshold, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.UWCompanyNotValidForAllStates", Period.UWCompany))
      }
    }
  }

  public function checkAnswers() {
    Context.addToVisited(this, "checkAnswers")
    validateOfferingAnswers()
    if(Period.Submission != null) //validate pre-qual answers for Submission only, although OOTB there should not be any pre-qual answers on non-submission periods
      validatePreQualAnswers()
  }

  public function checkReinsuranceForBindablePeriod() {
    Context.addToVisited(this, "checkReinsurance")
    if(Context.isAtLeast(ValidationLevel.TC_BINDABLE)){
      if(not Period.ValidReinsurance){
        Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Reinsurance.Error.CannotBindInvalidReinsurance"))
      }
      checkReinsurance()
    }
  }

  public function checkReinsurance() {
    var plugin = Plugins.get(IReinsurancePlugin)
    for (reinsurable in Period.AllReinsurables) {
      var validations = plugin.validateRisk(reinsurable, Context.Level)
      Context.Result.addValidations(validations)
    }
  }

  public function checkPolicyAddress(){
    if(_policyPeriod.PolicyAddress != null){
      // Ensure the policy address exists as one of the primary named insured's addresses and is not a retired address
      var pniAddresses = _policyPeriod.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact.AllAddresses
      if(  _policyPeriod.PolicyAddress.Address.Retired || !pniAddresses.contains( _policyPeriod.PolicyAddress.Address )){
        Result.addError(Period, TC_DEFAULT, DisplayKey.get("Web.Policy.Address.Validation.Orphaned", _policyPeriod.PolicyNumber) )
      }
    }
  }

  public function validatePreQualAnswers() {
    new AnswerValidation(Context, Period, Period.PeriodAnswers.where(\ answer -> answer.Question.QuestionSet.QuestionSetType == QuestionSetType.TC_PREQUAL), "PreQualification").validate()
  }

  public function validateOfferingAnswers() {
    new AnswerValidation(Context, Period, Period.PeriodAnswers.where(\ answer -> answer.Question.QuestionSet.QuestionSetType == QuestionSetType.TC_OFFERING), "Offering").validate()
  }

  public static function validateOfferingAnswers(period : PolicyPeriod) {
    gw.validation.PCValidationContext.doPageLevelValidation(\context -> new gw.policy.PolicyPeriodValidation(context, period).validateOfferingAnswers())
  }

  public static function validatePreQualAnswers(period : PolicyPeriod) {
    gw.validation.PCValidationContext.doPageLevelValidation(\ context -> new gw.policy.PolicyPeriodValidation(context, period).validatePreQualAnswers())
  }

  /**
   * Return an error string if this policy has been rewritten to a new account from another policy AND the period
   * start date of this period overlaps with its source policy. Otherwise return null.
   */
  public static function validateDateForRewriteNewAccount(period : PolicyPeriod) : String {
    var policy = period.Policy.RewrittenToNewAccountSource
    if (policy != null) {
      return validateRewrittenDestinationEffectiveDate(policy, period)
    }
    policy = period.Policy.RewrittenToNewAccountDestination
    if (policy != null) {
      return validateRewrittenSourceEffectiveDate(policy, period)
    }
    return null
  }

  /**
   * Returns an error string if EditEffectiveDate of Rewritten Destination Policy overlaps coverage end date of Source Policy.
   */
  private static function validateRewrittenDestinationEffectiveDate(sourcePolicy : Policy, destinationPeriod : PolicyPeriod) : String {
    var sourceTerminateDate = sourcePolicy.findCoverageEndDate()
    if (sourceTerminateDate == null) {
      return null
    }
    if (destinationPeriod.EditEffectiveDate < sourceTerminateDate) {
      return DisplayKey.get("Job.RewriteNewAccount.Error.PeriodStartBeforeSourceExpiration", sourceTerminateDate.ShortFormat)
    }
    return null
  }

  /**
   * Returns an error string if EditEffectiveDate of Rewritten Destination Policy overlaps coverage end date of Source Policy.
   */
  private static function validateRewrittenSourceEffectiveDate(destinationPolicy : Policy, sourcePeriod : PolicyPeriod) : String {
    var destinationStartDate = destinationPolicy.findEarliestPeriodStart()
    if (sourcePeriod.EditEffectiveDate > destinationStartDate) {
      return DisplayKey.get("Job.RewriteNewAccount.Error.PeriodStartAfterDestinationStart", destinationStartDate.ShortFormat)
    }
    return null
  }

  /**
   * Return an error string if this policy was rewritten to a new account AND the period
   * end date of this period overlaps with the policy start date of the rewritten policy. Otherwise return null.
   *
   * Note, to avoid overlapping, the period end may be on the same date, but it may not be after the rewritten period start
   */
  public static function validatePeriodEndDoesNotOverlapRewrittenNewAccountPolicy(aPeriod : PolicyPeriod) : String {
    var rewrittenPolicy = aPeriod.Policy.RewrittenToNewAccountDestination
    if (rewrittenPolicy == null){
      return null
    }
    var periodEnd = aPeriod.getCoverageEndDate()
    var rewrittenNewAccountPolicyPeriodStart = rewrittenPolicy.findEarliestPeriodStart()
    var errMsg = DisplayKey.get("Job.RewriteNewAccount.Error.ExpirationLaterThanRewriteEffectiveDate", rewrittenNewAccountPolicyPeriodStart.ShortFormat)
    return periodEnd > rewrittenNewAccountPolicyPeriodStart ? errMsg : null
  }


  private function checkReportingPolicyIsCreatedWithFinalAudit() {
    if (Context.isAtLeast(TC_BINDABLE)) {
      if (Period.IsReportingPolicy and Period.FinalAuditOption == TC_NO) {
        Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.ReportingPolicy.Create"))
      }
    }
  }

  private function checkFinalAuditScheduledBeforeCompletingPremiumReport() {
    if (Context.isAtLeast(TC_BINDABLE) and Period.IsReportingPolicy) {
      if (not Period.AuditInformations.hasMatch(\ a -> a.IsFinalAudit and not (a.IsWaived or a.IsWithdrawn or a.HasBeenReversed))) {
        Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.ReportingPolicy.CompleteReport"))
      }
    }
  }

  private function checkFinalAuditNotCompleteOrQuotedIfTryingToCompletePremiumReport() {
    if (Context.isAtLeast(TC_BINDABLE)) {
      var info = Period.Audit.AuditInformation
      if (info.IsPremiumReport){
        if(Period.CompletedNotReversedFinalAudits.HasElements) {
          Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.ReportingPolicy.FinalAuditComplete"))
        }else if(Period.hasQuotedNotReversedAudit()){
          Result.addError(Period, TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.ReportingPolicy.FinalAuditQuoted"))
        }
      }
    }
  }

  private function checkUniqueKeyBeansHaveNoDuplicates() {
    if (Context.isAtLeast(_quoteRelatedThreshold)) {
      // Get all the Beans that should be unique on the policy, and partition them into a map by their EffDatedUniqueKey
      // any key that then maps to more than 1 bean within the slice has duplicates, and can be reported as a validation error
      var overlappingMap = Period.UniqueOnPolicyPeriodBeansForValidation.partition(\ g -> g.genUniqueKey())
      for (duplicateValues in overlappingMap.Values.where(\ l -> l.Count > 1)) {
        Result.addError(Period, _quoteRelatedThreshold,  duplicateValues[0].getErrorMessage(Coercions.makeArray<entity.EffDated>(duplicateValues)))
      }
    }
  }

  private function checkNamedInsuredIndustryCode() {
    if (Context.isAtLeast(_quoteRelatedThreshold)) {
      for (policyNamedInsured in Period.NamedInsureds) {
        var referenceState = JurisdictionMappingUtil.getJurisdiction(policyNamedInsured.AccountContactRole.AccountContact.Contact.PrimaryAddress)
        var referenceDate = (referenceState == null) ? Period.EditEffectiveDate : Period.getReferenceDateForCurrentJob(referenceState)
        var previousCode = Period.Job.NewTerm ? null : policyNamedInsured.BasedOn.IndustryCode.Code

        if (policyNamedInsured.IndustryCode != null) {
          if (!industryCodeIsValid(policyNamedInsured.IndustryCode, referenceDate, previousCode)) {
            Result.addError(Period, _quoteRelatedThreshold,
                DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NamedInsured.UnavailableCode", policyNamedInsured.IndustryCode.Code), "PolicyInfo")
          }
        }
      }
    }
  }

  private function checkPolicyLocationIndustryCode() {
    if (Context.isAtLeast(_quoteRelatedThreshold)) {
      var locVLs = Period.BasedOn.VersionList.PolicyLocations
      if (locVLs != null) {
        locVLs.allVersionsFlat<PolicyLocation>() // warm up the bundle and global cache
      }
      for (pLocation in Period.PolicyLocations) {
        var referenceState = JurisdictionMappingUtil.getJurisdiction(pLocation)
        var referenceDate = (referenceState == null) ? Period.EditEffectiveDate : Period.getReferenceDateForCurrentJob(referenceState)
        var previousCode = Period.Job.NewTerm ? null : pLocation.BasedOn.IndustryCode.Code
        if (!industryCodeIsValid(pLocation.IndustryCode, referenceDate, previousCode)) {
          Result.addError(Period, _quoteRelatedThreshold,
              DisplayKey.get("Web.Policy.PolicyPeriod.Validation.PolicyLocation.UnavailableCode", pLocation.IndustryCode.Code), "Locations")
        }
      }
    }
  }

  private function industryCodeIsValid(iCode : IndustryCode, referenceDate : Date, previousCode : String) : boolean {
    if (iCode != null) {  // seems like only worker's comp's location needs the industry code
      // retriving the latest from database
      var industryCode = iCode.Bundle.loadBean(iCode.ID) as IndustryCode
      if (!industryCode.isAvailable(referenceDate)) {
        if (previousCode == null ||
            (previousCode != null and iCode.Code != previousCode)) {
          return false
        }
      }
    }
    return true
  }

  private function checkProductIsValid() {
    if (Context.isAtLeast(_quoteRelatedThreshold)) {
      if (Period.Policy.Account.getAvailableProduct(Period.PolicyProductRoot, Period.Policy.Product) == null) {
        Result.addError(Period, _quoteRelatedThreshold,
            DisplayKey.get("Web.Policy.PolicyPeriod.Validation.UnavailableProduct", Period.Policy.Product.Description), "PolicyInfo")
      }
    }
  }

  private function checkOrganizationTypeIsValid() {
    if (Context.isAtLeast(_quoteRelatedThreshold)) {
      if (Period.Policy.Product.isContactTypeSuitableForProductAccountType(Company) and Period.Policy.Account.AccountOrgType == null) {
        Result.addError(Period, _quoteRelatedThreshold,
            DisplayKey.get("Web.Policy.PolicyPeriod.Validation.RequiredOrganizationType"), "PolicyInfo")
      }
    }
  }

  /**
   * Ensure that the exchange rates between the coverage currencies (default and instantiated) and the settlement
   * currency are available
   */
  private function checkCoverageAndSettlementCurrenciesCompatible() {
    var fxPlugin = PCDependenciesGateway.getPluginConfig().getPlugin(IFXRatePlugin)
    var settling = Period.PreferredSettlementCurrency
    var currency = Period.PreferredCoverageCurrency;
    if (!fxPlugin.canConvert(currency, settling)) {
      Result.addError(Period, TC_DEFAULT, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.CurrencyExchangeUnsupported", currency.Code, settling.Code), "Currency")
    }
  }

  /**
   * Ensure that the currently selected Producer Code of Service is allowed for the policy period
   */
  private function checkProducerCodeOfServiceIsValid() {
    var producerCode = Period.Policy.ProducerCodeOfService
    // Determine the allowed producer code states based on the job type
    var forUseIn = ProducerStatusUse.TC_OKAY
    if (Period.Job.Subtype == typekey.Job.TC_SUBMISSION) {
      forUseIn = ProducerStatusUse.TC_SUBMISSIONOKAY
    } else if (Period.Job.Subtype == typekey.Job.TC_RENEWAL) {
      forUseIn = ProducerStatusUse.TC_RENEWALOKAY
    }
    // Is the producer's status allowed for this job type?
    if (!producerCode.ProducerStatus.hasCategory(forUseIn)) {
      Result.addError(Period.Policy, ValidationLevel.TC_DEFAULT,
          DisplayKey.get("Web.ProducerSelection.Error.SuspendedPolicyProducerCodeOfService", producerCode), "PolicyInfo")
    }
  }

  private function checkProducerCodeOfRecordIsConfiguredForSettlementCurrency() {
    if (Context.isAtLeast(ValidationLevel.TC_BINDABLE)) {
      if (!Period.ProducerCodeOfRecord.AllCurrencies.contains(Period.PreferredSettlementCurrency)) {
        Result.addError(Period, ValidationLevel.TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.ProducerCodeOfRecordNotConfiguredForSettlementCurrency", Period.PreferredSettlementCurrency.Code))
      }
    }
  }

  private function checkAgencyBillIsConfiguredForSettlementCurrency() {
    if (Context.isAtLeast(ValidationLevel.TC_BINDABLE) and Period.BillingMethod == BillingMethod.TC_AGENCYBILL) {
      var allAgencyBillPlanCurrencies = (Period.ProducerOfRecord?.AgencyBillPlans*.Currency) ?: new Currency[0]
      if (!allAgencyBillPlanCurrencies.contains(Period.PreferredSettlementCurrency)) {
        Result.addError(Period, ValidationLevel.TC_BINDABLE, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NoAgencyBillsForSettlementCurrency", Period.PreferredSettlementCurrency))
      }
    }
  }

  /**
   * Ensure our product is a match with the chosen affinity group
   */
  function checkAffinityGroupProductCode() {
    var affinityGroup = _policyPeriod.PolicyTerm.AffinityGroup
    // if any affinity group products are specified, make sure they match our product
    if (affinityGroup == null or
        affinityGroup.Products.IsEmpty or
        affinityGroup.Products*.ProductCode.contains(_policyPeriod.Policy.ProductCode)) {
      return
    }
    // add an error otherwise
    Result.addError(_policyPeriod, ValidationLevel.TC_QUOTABLE,
        DisplayKey.get("Web.Policy.PolicyPeriod.Validation.AffinityGroup.NonCoveredProduct", affinityGroup.DisplayName,
            ProductLookup.getByPublicID(_policyPeriod.Policy.ProductCode).DisplayName))
  }

  /**
   * Ensure our producer code is a match with the chosen affinity group
   */
  function checkAffinityGroupProducerCode() {
    var affinityGroup = _policyPeriod.PolicyTerm.AffinityGroup
    // if any affinity group producer codes are specified, make sure they match our producer code
    if (affinityGroup == null or
        affinityGroup.AffinityGroupProducerCodes.IsEmpty or
        affinityGroup.AffinityGroupProducerCodes*.ProducerCode.contains(_policyPeriod.ProducerCodeOfRecord)) {
      return
    }
    // add an error otherwise
    Result.addError(_policyPeriod, ValidationLevel.TC_QUOTABLE,
        DisplayKey.get("Web.Policy.PolicyPeriod.Validation.AffinityGroup.NonCoveredProducerCode", affinityGroup.DisplayName,
            _policyPeriod.ProducerCodeOfRecord.DisplayName))
  }

  function checkBaseState() {
    if (Context.isAtLeast(ValidationLevel.TC_DEFAULT)) {
      if (Period.Lines.hasMatch( \ line -> line.BaseStateRequired == true and line.BaseState == null) ) {
        Result.addError(Period, ValidationLevel.TC_DEFAULT, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.NullBaseState"), "PolicyInfo")
      }
    }
  }

  function checkForOrphanedEffDatedRanges() {
    // firing the check on OOS jobs only
    if (Period.Job.OOSJob) {
      var orphanedFKs = new OrphanedEffDatedRanges(Period).findOrphanedFields();
      orphanedFKs.each(\o -> Result.addError(o.First, ValidationLevel.TC_DEFAULT, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.OrphanedField", o.First, o.Second)))
    }
  }

  private function checkAllPaymentsAreInTheSameCurrency() {
    var payments = Period.Job.UpFrontPayments
    if (payments.HasElements and not payments.allMatch(\ elt -> payments[0].Amount_cur == elt.Amount_cur)) {
      Result.addError(Period, ValidationLevel.TC_DEFAULT, DisplayKey.get("Web.Policy.PolicyPeriod.Validation.PaymentsInMoreThanOneCurrency"), "PolicyInfo")
    }
  }
}
