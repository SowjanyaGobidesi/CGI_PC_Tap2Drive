package gw.billing

uses gw.api.productmodel.AuditSchedulePattern
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.api.util.MonetaryAmounts
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.Plugins
uses gw.plugin.billing.BillingAccountSearchResult
uses gw.plugin.billing.BillingInvoiceStreamInfo
uses gw.plugin.billing.BillingPaymentInstrument
uses gw.plugin.billing.BillingPolicyNotFoundException
uses gw.plugin.billing.BillingUnappliedFundInfo
uses gw.plugin.billing.IBillingSummaryPlugin
uses gw.plugin.billing.IBillingSystemPlugin
uses gw.plugin.billing.PaymentPlanData
uses gw.plugin.policyperiod.IPolicyPeriodPlugin

uses java.lang.Exception
uses java.lang.IllegalStateException
uses java.lang.SuppressWarnings
uses gw.api.locale.DisplayKey
uses gw.plugin.billing.PolicyPeriodBillingInfo

/**
 * Defines enhancements for the billing information in PolicyPeriod.
 */
enhancement PolicyPeriodBillingEnhancement : entity.PolicyPeriod {

  /**
   * An array of available billing methods for this policy period.
   *
   * If the producer code of record does not support the given currency, BC returns null.  However, we always add
   * List Bill to the list of supported billing methods.
   *
   * If the producer code of record is not found in BC, it throws an exception. We catch it here and return an empty
   * collection to signify there is NO valid billing method as configured.
   *
   * There should be validation which ensures we cannot bind until the incompatibility between producer code and
   * currency is resolved.
   */
  property get AvailableBillingMethods() : BillingMethod[] {
    try {
      var policyPeriodPlugin = Plugins.get(IPolicyPeriodPlugin)
      var supportedMethods = policyPeriodPlugin.getSupportedBillingMethods(this)
      if (supportedMethods.Count > 1) {
        var BillingSystem = Plugins.get(IBillingSystemPlugin)
        var bcBillingMethods = BillingSystem
          .getAvailableBillingMethods(this.ProducerCodeOfRecord.PublicID, this.PreferredSettlementCurrency)
        supportedMethods = supportedMethods.where(\ b -> bcBillingMethods.contains(b))
      }
      return supportedMethods
    } catch (e : Exception) {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error("Problem getting BillingMethods, returning an empty collection", e)
      return {}
    }
  }

  /**
   * Return list of {@link typekey.SpecialHandling} types for this period.
   */
  property get AvailableSpecialHandlingTypes() : List<SpecialHandling> {
    var specialHandlingList = new ArrayList<SpecialHandling>()
    specialHandlingList.addAll(SpecialHandling.TF_SPECIALHANDLINGFORNONAUDIT.TypeKeys)
    if (this.hasScheduledFinalAudit() or this.hasOpenFinalAudit()) {
      specialHandlingList.addAll(SpecialHandling.TF_SPECIALHANDLINGFORAUDIT.TypeKeys)
    }
    return specialHandlingList
  }

  /**
   * Returns the change in cost on period from its basedOn period
   */
  property get ChangeInTotalCostRPT() : MonetaryAmount {
    return this.TotalCostRPT?.subtract(this.BasedOn.TotalCostRPT)
  }

  /**
   * The selected billing invoice stream for this policy period.
   *
   * Only available for new term.
   */
  public property get SelectedInvoiceStream() : BillingInvoiceStreamInfo {
    if (this.InvoiceStreamCode == null) {
      return null
    }
    return this.AvailableInvoiceStreams.firstWhere(\ s -> s.PublicID == this.InvoiceStreamCode)
  }

  /**
   * Convenience method to reset the various Billing parameters that must be re-selected
   * as a result of a Currency change.
   */
  function preferredSettlementCurrencyUpdated() {
    if(this.BillingMethod == BillingMethod.TC_LISTBILL) {
      // Alt billing account for list bill is currency-specific, remove it before resetting other billing variables.
      unsetAltBillingAccountNumber()
    }

    // The currently selected PaymentPlan may no longer be valid for the new Currency.
    // Set it to null so the user must re-select it after Quote.
    // During Quote process, we will retrieve relevant payment plans for this Currency
    // from the billing system.
    unsetPaymentPlan()

    // Any selected Custom Billing options are no longer applicable, so clear them out.
    clearCustomBilling()

    // Clear the estimated premium.
    this.EstimatedPremium = null
  }

  /**
   * Update this period's cached payment plans if it is a new term process.
   *
   * This should be invoked when the BillingMethod or AltBillingAccountNumber
   * for the branch have been changed.
   *
   * This should only be invoked after the branch has been quoted.
   */
  function refreshInvoiceStreams() {
    if (this.JobProcess typeis gw.job.NewTermProcess) {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Refreshing available payment plans from Billing System, branch: " + this)
      updateInvoiceStreamAccordingToPaymentPlan()
    }
  }

  /**
   * Return whether the specified billing invoice stream can be selected
   *    for this policy period based on its selected payment plan.
   *
   * @param stream The billing invoice stream
   */
  @SuppressWarnings({"all"})
  function canSelectInvoiceStream(stream : BillingInvoiceStreamInfo) : boolean {
    if (stream.PaymentMethod == AccountPaymentMethod.TC_UNSUPPORTED) {
      return false
    }

    if (this.SelectedPaymentPlan == null) {
      return true
    }

    var validInterval = stream.Interval == this.PaymentFrequency
    var validPaymentMethod = this.SelectedPaymentPlan.AllowResponsive or (stream.PaymentMethod != TC_RESPONSIVE)
    return (validInterval and validPaymentMethod)
  }

  /**
   * The payment frequency for this policy period.
   */
  public property get PaymentFrequency() : BillingPeriodicity {
    switch(this.SelectedPaymentPlan.InvoiceFrequency) {
      case TC_TWICEPERMONTH: return TC_TWICEPERMONTH
      case TC_EVERYWEEK: return TC_EVERYWEEK
      case TC_EVERYOTHERWEEK: return TC_EVERYOTHERWEEK
      default: return TC_MONTHLY
    }
  }

  /**
   * The available payment instruments for this policy period.
   */
  public property get AvailablePaymentInstruments() : BillingPaymentInstrument[] {
    return callBillingSystemPlugin(\ plugin ->
      plugin.getExistingPaymentInstruments(this.BillingAccountNumber, this.PreferredSettlementCurrency)).cast(BillingPaymentInstrument)
  }

  /**
   * Whether the selected payment plan for this policy period is "Responsive".
   */
  public property get AllowResponsive() : boolean {
    var paymentPlan = this.SelectedPaymentPlan
    return paymentPlan == null or paymentPlan.IsReportingPlan or paymentPlan.AllowResponsive
  }

  /**
   * Return the billing sub-accounts for this policy period.
   */
  property get SubAccounts() : BillingAccountSearchResult[] {
    return callBillingSystemPlugin(\ plugin -> plugin.getSubAccounts(BillingAccountNumber))
  }

  /**
   * The available billing invoice streams for this policy period.
   */
  property get AvailableInvoiceStreams() : BillingInvoiceStreamInfo[] {
    return callBillingSystemPlugin(\ plugin ->
      plugin.getInvoiceStreams(BillingAccountNumber, this.PreferredSettlementCurrency, this.SelectedPaymentPlan?.asPaymentPlanData()))
        .cast(BillingInvoiceStreamInfo)
  }

  /**
   * The unapplied funds for the Billing Account
   */
  property get UnappliedFunds() : BillingUnappliedFundInfo[] {
    return callBillingSystemPlugin(\ plugin ->
        plugin.retrieveAccountUnappliedFunds(BillingAccountNumber, this.PreferredSettlementCurrency)).cast(BillingUnappliedFundInfo)
  }

  /**
   * The billing account number of this policy period.
   *
   * It is either the policy's account number or an alternate billing account
   * number specified for this period.
   */
  property get BillingAccountNumber() : String {
    return this.AltBillingAccountNumber == null
      ? this.Policy.Account.AccountNumber
      : this.AltBillingAccountNumber
  }

  private function callBillingSystemPlugin<T>(_call : block(plugin : IBillingSystemPlugin) : T) : T {
    var plugin = Plugins.get(IBillingSystemPlugin)
    return _call(plugin)
  }

  /**
   * The billing contact for this policy period.
   */
  property get BillingContact() : PolicyBillingContact {
    return this.EffectiveDatedFields.BillingContact
  }

  /**
   * Whether a reporting plan is selected for this policy period.
   */
  property get ReportingPlanSelected() : boolean {
    if(this.Archived) {
      throw "Cannot access SelectedPaymentPlan on an archived Policy Period."
    }

    return this.SelectedPaymentPlan != null &&
           this.SelectedPaymentPlan.IsReportingPlan
  }

  /**
   * The reporting audit schedule pattern for this policy period.
   */
  property get ReportingPattern() : AuditSchedulePattern {
    if (not ReportingPlanSelected) {
      throw "No reporting plan is selected"
    }
    return this.SelectedPaymentPlan.ReportingPattern
  }

  /**
   * Whether an installments plan is selected for this policy period.
   */
  property get InstallmentsPlanSelected() : boolean {
    return this.SelectedPaymentPlan != null &&
           this.SelectedPaymentPlan.IsInstallmentsPlan
  }

  /**
   * Unset the selected payment plan for this policy period.
   *
   * This includes clearing the selected payment plan, the deposit amount,
   * and the deposit override percent.
   */
  function unsetPaymentPlan() {
    removeSelectedPaymentPlan()
    this.DepositOverridePct = null
    this.DepositAmount = null
  }

  /**
   * Removes and nulls out only the currently selected payment plan.
   */
  function removeSelectedPaymentPlan() {
    var currentPlan = this.SelectedPaymentPlan
    if (currentPlan != null) {
      currentPlan.remove()
    }
    this.SelectedPaymentPlan = null
  }

  function unsetAltBillingAccountNumber() {
    this.AltBillingAccountNumber = null
  }

  /**
   * Calculate and set the deposit amount for this policy period
   *    based on the total subject to reporting and override percent.
   */
  function calculateAndSetDepositAmountOnReporting() : MonetaryAmount {
    var depositAmt : MonetaryAmount
    if (this.TotalSubjectToReporting != null and this.DepositOverridePct != null) {
      depositAmt = this.TotalSubjectToReporting * this.DepositOverridePct / 100
    } else if (this.TotalSubjectToReporting != null and this.ReportingPattern.ReportingDefaultDepositPct != null) {
      depositAmt = this.TotalSubjectToReporting * this.ReportingPattern.ReportingDefaultDepositPct / 100
    } else {
      depositAmt = null
    }
    if (depositAmt != null) {
      depositAmt = MonetaryAmounts.roundToCurrencyScale(depositAmt.Amount, depositAmt.Currency, HALF_EVEN)
    }
    this.DepositAmount = depositAmt
    return depositAmt
  }

  /**
   * Set the specified payment plan for this policy period.
   *
   * @param plan The payment plan to be selected for this period.
   */
  function selectPaymentPlan(plan: PaymentPlanData) {
    if (plan != null and !plan.isSameBillingPaymentPlan(this.SelectedPaymentPlan)) {
      // Clear the current Payment Plan fields
      unsetPaymentPlan()
      this.SelectedPaymentPlan = plan.createPaymentPlanSummary(this.Bundle)
      if (this.SelectedPaymentPlan.IsReportingPlan) {
        setFieldsFromNewReportingPlan()
      } else {
        updateInvoiceStreamAccordingToPaymentPlan()
      }
    }
  }

  /**
   * Update the invoice stream for this policy period based on its selected payment plan.
   */
  function updateInvoiceStreamAccordingToPaymentPlan() {
    if (this.CustomBilling) {
      var validInvoiceStreams = this.AvailableInvoiceStreams.where(\ b -> canSelectInvoiceStream(b))*.PublicID
      if (not validInvoiceStreams.contains(this.InvoiceStreamCode)) {
        this.InvoiceStreamCode = validInvoiceStreams.first()
      }
      this.NewInvoiceStream.Interval = this.PaymentFrequency
      if (not (this.NewInvoiceStream.Automatic or this.AllowResponsive)) {
        this.NewInvoiceStream.setDefaultsWithAutomaticPayment()
      }
    }
    else {
      clearCustomBilling()
    }
  }

  /**
   * Sets the specified reporting plan for this policy period.
   *
   * @param plan The reporting plan to be selected for this period.
   */
  function setFieldsFromNewReportingPlan() {
    this.FinalAuditOption = FinalAuditOption.TC_YES
    this.DepositAmount =  this.TotalSubjectToReporting * this.SelectedPaymentPlan.DefaultDepositPercent / 100
    this.DepositOverridePct = null
  }

  /**
   * Returns whether the deposit amount can be overridden for this policy period.
   */
  function canOverrideDeposit() : boolean {
    return this.Submission != null or this.Issuance != null or this.Reinstatement != null
      or (this.PolicyChange != null and not this.PolicyTerm.DepositReleased)
  }

  /**
   * Updates deposit in this policy term, whose value to be sent to BC later
   * Currently updatePolicyTermDepositAmount() is called during submission, rewrite, renewal, issuance,
   * policy change and reinstatement in WC reporting policies.
   * see calculateDeposit() in PolicyInfoEnhancement for more information
   */
  function updatePolicyTermDepositAmount() {
    if(not this.PolicyTerm.DepositReleased){
      this.PolicyTerm.DepositAmount = this.DepositAmount
    }
  }

  /**
   * The previous deposit amount for this policy period.
   */
  property get PrevDepositAmount() : MonetaryAmount {
    return this.PolicyTerm.DepositReleased ? 0bd.ofCurrency(this.PreferredSettlementCurrency) : this.BasedOn.DepositAmount
  }

  /**
   * The difference in the deposit amount from the previous period.
   */
  property get DepositChangeFromBasedOnPeriod() : MonetaryAmount {
    var currentDepositAmount = this.DepositAmount
    return currentDepositAmount.subtract(PrevDepositAmount == null ? 0bd.ofCurrency(this.PreferredSettlementCurrency) : PrevDepositAmount)
  }

  property get PreviouslyChargedAmount() : MonetaryAmount {
    var transactions = gw.api.domain.financials.TransactionFinder.instance.findPreviouslyPostedTransactions( this )
    return transactions.where(\ t -> t.Charged).toSet().AmountSum(this.PreferredSettlementCurrency)
  }

  /**
   * Create a new payment instrument for this period using the specified
   *    payment method and token.
   */
  @SuppressWarnings({"all"})
  function createPaymentInstrument(paymentMethod : AccountPaymentMethod, accountNumber : String, token : String) : BillingPaymentInstrument {
    if (paymentMethod == null) {
      throw new IllegalStateException("Payment method cannot be null.")
    }
    if (paymentMethod == AccountPaymentMethod.TC_UNSUPPORTED) {
      throw new IllegalStateException(DisplayKey.get("BillingSystemPlugin.Error.UnsupportedPaymentMethod"))
    }
    if (this.Status == PolicyPeriodStatus.TC_BOUND) {
      throw new IllegalStateException("Cannot add payment instrument on bound policy")
    }
    if (accountNumber == null) {
      accountNumber = this.BillingAccountNumber
    }
    var plugin = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSystemPlugin)
    var paymentInstrument = new gw.plugin.billing.BillingPaymentInstrumentImpl()
    paymentInstrument.PaymentMethod = paymentMethod
    paymentInstrument.Token = token
   return plugin.addPaymentInstrumentTo(accountNumber, this.PreferredSettlementCurrency, paymentInstrument)
  }

  function disableCustomBilling() {
    if (this.InvoicingMethod == InvoicingMethod.TC_CUSTOMBILLING) {
      this.InvoicingMethod = InvoicingMethod.TC_DEFAULTBILLING
    } // else, do nothing
  }

  /**
   * Unset custom billing instructions from this policy period.
   */
  function clearCustomBilling() {
    disableCustomBilling()

    // Create a new invoice stream, and remove the existing one, but do not use the setter on PolicyPeriod
    // to avoid DB constraint issues -- only set the key from the new BillingInvoiceStream TO the PolicyPeriod.
    if (this.NewInvoiceStream != null) {
      this.NewInvoiceStream.remove()
    }
    new BillingInvoiceStream(this).PolicyPeriod = this

    this.InvoiceStreamCode = null
  }

  property get SettlementCurrencyChangedFromBasedOn() : boolean {
    // If no BasedOn (e.g., submission case) then it hasn't changed.
    if(this.BasedOn == null) {
      return false;
    }
    return this.PreferredSettlementCurrency != this.BasedOn.PreferredSettlementCurrency
  }

  /**
   * Returns the default billing method for this PolicyPeriod.
   */
  function calculateDefaultBillingMethod() : BillingMethod {
    var availableBillingMethods = this.AvailableBillingMethods

    // Return the BillingMethod of the prior PolicyPeriod if it exists and is still available
    var priorPeriodInBC = findPriorPeriodInBC()
    if (priorPeriodInBC != null and availableBillingMethods.contains(priorPeriodInBC.BillingMethod)) {
      return priorPeriodInBC.BillingMethod
    }

    // Return TC_DIRECTBILL if available
    if (availableBillingMethods.contains(typekey.BillingMethod.TC_DIRECTBILL)) {
      return typekey.BillingMethod.TC_DIRECTBILL
    }

    // Otherwise return the first available method
    return availableBillingMethods.first()
  }

  /**
   * Returns the default payment plan for this PolicyPeriod.
   */
  function calculateDefaultPaymentPlan() : PaymentPlanData {
    var paymentPlan : PaymentPlanData
    var availablePlans = this.retrievePaymentPlansWithoutSettingBillingAmounts()

    var priorPeriodInBC = findPriorPeriodInBC()
    if (priorPeriodInBC == null) {
      // If no prior period exists, default to the first plan returned from the billing system
      // PC-26566 If the policy line supports reporting plans, then available plans will have some
      //          reporting plans, and we need to pick one of those
      paymentPlan = availablePlans.ReportingPlans.first()
      if (paymentPlan == null) {
        paymentPlan = availablePlans.first()
      }
    } else {
      var matchingPlans = availablePlans.where(\ plan -> plan.BillingId == priorPeriodInBC.PaymentPlanID)
      if (matchingPlans.length == 0) {
        // Default to the first plan returned from the billing system if the prior period plan is unavailable
        paymentPlan = availablePlans.ReportingPlans.first()
        if (paymentPlan == null) {
          paymentPlan = availablePlans.first()
        }
      } else if (matchingPlans.length == 1) {
        // Default to the prior period payment plan if it's available
        paymentPlan = matchingPlans.single()
      } else {
        // Default to plan with the same ReportingPattern as the based-on period if possible
        var matchingReportingPlans = matchingPlans.ReportingPlans.where(\ plan -> plan.ReportingPatternCode == this.BasedOn.ReportingPattern.PublicID)
        paymentPlan = matchingReportingPlans.length > 0 ? matchingReportingPlans.first() : matchingPlans.first()
      }
    }

    this.updateBillingAmountsOnInstallmentsPlans({paymentPlan})
    return paymentPlan
  }

  function calculateDefaultCustomBilling() : boolean {
    return (this.BillingMethod == BillingMethod.TC_LISTBILL or
        (this.BillingMethod == BillingMethod.TC_DIRECTBILL and (this.CustomBilling || this.InvoiceStreamCode != null)))
  }

  function calculateDefaultInvoicingMethod() : InvoicingMethod {
    if (calculateDefaultCustomBilling()) {
      return InvoicingMethod.TC_CUSTOMBILLING
    } else {
      return InvoicingMethod.TC_DEFAULTBILLING
    }
  }

  /**
   * Returns the default invoice stream code for this PolicyPeriod.
   * An Invoice Stream should only be selected if there was a prior period in BC.
   */
  function calculateDefaultInvoiceStreamCode() : String {
    if (this.BillingMethod == BillingMethod.TC_DIRECTBILL || this.BillingMethod == BillingMethod.TC_LISTBILL) {
      var validInvoiceStreamIDs = this.AvailableInvoiceStreams*.PublicID

      var priorPeriodInBC = findPriorPeriodInBC()
      if (priorPeriodInBC != null) {
        if (validInvoiceStreamIDs.contains(priorPeriodInBC.InvoiceStreamCode)) {
          // Default to the invoice stream code from the prior period if it exists and is available
          return priorPeriodInBC.InvoiceStreamCode
        } else if (priorPeriodInBC.InvoiceStreamCode != null) {
          // Default to the first valid available invoice stream
          return validInvoiceStreamIDs.first()
        }
      }
    }
    return null
  }

  /**
   * Returns the default alternate billing account number for this PolicyPeriod.
   */
  function calculateDefaultAltBillingAccountNumber(billingMethod : BillingMethod) : String {
    if (this.SettlementCurrencyChangedFromBasedOn and billingMethod == BillingMethod.TC_LISTBILL) {
      // If the settlement currency changes on a list bill policy, then we can't use the prior term alternate biller
      return null
    }
    // Default to the alternate biller from the prior period if it exists
    var priorPeriodInBC = findPriorPeriodInBC()
    return priorPeriodInBC?.AltBillingAccountNumber
  }

  /**
   * Returns information about the prior PolicyPeriod from the billing system. Returns null if there is no prior
   * PolicyPeriod or if it is not known in the billing system.
   */
  private function findPriorPeriodInBC() : PolicyPeriodBillingInfo {
    if (this.BasedOn == null) {
      return null
    }
    var priorPeriodInBC = Plugins.get(IBillingSystemPlugin).getPeriodInfo(this.BasedOn)
    if (priorPeriodInBC == null) {
      PCLoggerCategory.BILLING.warn("Unable to retrieve policy period information from billing system for Policy number " + this.BasedOn.PolicyNumber + " and term number " + this.BasedOn.TermNumber)
    }
    return priorPeriodInBC
  }

  /**
   * Checks if the initial payment needed for this period is paid. The first payment can be the Down Payment or the
   * Deposit, depending on the option chosen by the insurer.
   * @return true if the first payment is completed, false otherwise.
   */
  property get InitialPaymentComplete() : boolean {
    return this.Job.AmountPaid >= PaymentAmount
  }

  /**
   * It's the amount of money needed for the first payment, it can be the DownPayment or the Deposit, depending on the
   * option chosen by the insurer.
   * @return The amount of money due for the first payment
   */
  property get PaymentAmount() : MonetaryAmount {
    var amountToPay = this.SelectedPaymentPlan.DownPayment
    if (amountToPay == null) {
      amountToPay = this.DepositAmount
    }
    if (amountToPay == null) {
      amountToPay = new MonetaryAmount(0, this.PreferredSettlementCurrency)
    }
    return amountToPay
  }

  /**
   * If there is money collected from the insurer, it creates an activity as a remainder of the payment.
   * This activity purpose is to give the money back to the insurer if the job is expired.
   */
  function maybeCreatePaymentActivity() {
    if (this.Job.AmountPaid.Amount > 0bd) {
      var activityPattern = ActivityPattern.finder.getActivityPatternByCode("review_payment")
      var message = DisplayKey.get("Job.PaymentRequired.Activity.Description", this.Job.JobNumber)
      var activity = activityPattern.createAccountActivity( this.Bundle, activityPattern, this.Policy.Account, null, message, null, null, null, null, null)
      activity.autoAssign()
    }
  }

  /**
   * Check if the policy can possibly be archived in Billing System.
   */
  private function canBeArchivedInBillingSystem() : boolean {
    return PCConfigParameters.BillingSystemArchiveEnabled.Value and
        (PCConfigParameters.BillingSystemArchivePolicyPeriodDays.Value < 0 or
            this.getCoverageEndDate().DaysSince >= PCConfigParameters.BillingSystemArchivePolicyPeriodDays.Value)
  }

  /**
   * This method checks to see if the Policy has been archived in the Billing System.  A Period would only be archived
   * if it was sent to the Billing System which would only happen if it were Posted.  If the status is not Posted, we
   * assume false.  Likewise, if the Billing System indicates the policy is not in the system (BillingPolicyNotFoundException)
   * we also assume it is not archived.
   * @return true if certain the policy has been archived in Billing System
   */
  property get IsArchivedInBillingSystem() : boolean {
    if (!PolicyPeriodStatus.TF_POSTED.TypeKeys.contains(this.Status)) {
      return false
    }
    if (!canBeArchivedInBillingSystem()) {
      return false
    }
    try {
      var summary = Plugins.get(IBillingSummaryPlugin).retrievePolicyBillingSummary(this.PolicyNumber, this.TermNumber)
      return summary.Archived
    } catch (notFoundException : BillingPolicyNotFoundException) {  // if it's not in the billing system, assume it's not archived
      return false
    }
  }

  /**
   * Check if the policy period should be sent to Billing System.
   * @return true if the policy period should be sent to Billing System
   */
  property get ShouldSendToBillingSystem() : boolean {
    // The periods with null TermNumber, which result from withdrawn transactions
    // or any branch which is not promoted should not be sent to Billing System
    return this.TermNumber != null && this.Promoted
  }
}
