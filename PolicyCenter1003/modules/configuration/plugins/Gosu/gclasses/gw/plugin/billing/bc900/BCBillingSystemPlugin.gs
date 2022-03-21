package gw.plugin.billing.bc900

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.LocaleUtil
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.*
uses gw.xml.ws.WsdlFault
uses typekey.*
uses typekey.Job
uses wsi.remote.gw.webservice.bc.bc900.billingapi.BillingAPI
uses wsi.remote.gw.webservice.bc.bc900.billingapi.enums.InvoiceItemType
uses wsi.remote.gw.webservice.bc.bc900.billingapi.faults.AlreadyExecutedException
uses wsi.remote.gw.webservice.bc.bc900.billingapi.faults.BadIdentifierException
uses wsi.remote.gw.webservice.bc.bc900.billingapi.types.complex.BCAccountSearchCriteria
uses wsi.remote.gw.webservice.bc.bc900.billingapi.types.complex.InvoiceSummaryItem
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.CancelPolicyInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.FinalAuditInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.IssuePolicyInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.NewProducerCodeInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCAccountInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCContactInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCNewProducerInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCPolicyPeriodInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PCProducerInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PaymentPlanInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PolicyChangeInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.PremiumReportInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.ProducerCodeInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.ReinstatementInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.RenewalInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.RewriteInfo

uses java.lang.IllegalArgumentException
uses java.lang.IllegalStateException
uses java.lang.Integer
uses java.lang.SuppressWarnings
uses java.util.ArrayList
uses java.util.Arrays
uses wsi.remote.gw.webservice.bc.bc900.billingapi.enums.ChargeCategory
uses java.util.Date
uses java.util.List
uses gw.plugin.billing.PaymentPlanInfoSpec

/**
* This is the implementation of IBillingSystemPlugin that connects to a 900
* Guidewire BillingCenter via SOAP
*/
@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class BCBillingSystemPlugin implements IBillingSystemPlugin {

  private property get BillingAPIWithLanguage() : BillingAPI {
    var billingAPI = new BillingAPI()
    billingAPI.Config.Guidewire.Locale = LocaleUtil.CurrentLanguage.Code
    return billingAPI
  }

  protected function callUpdate<T>(call : block(api : BillingAPI) : T) : T {
    try {
      return call(BillingAPIWithLanguage)
    } catch(e : AlreadyExecutedException) {
      // already executed, just ignored this call
    }
    return null
  }

  override function createAccount(account : Account, transactionID : String) : String {
    var accountInfo = new PCAccountInfo()
    accountInfo.sync(account)
    PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Sending account ${account} to Billing System")
    var currencyEnum = wsi.remote.gw.webservice.bc.bc900.billingapi.enums.Currency.forGosuValue(account.PreferredSettlementCurrency.Code)
    return callUpdate(\ b -> BillingAPIWithLanguage.createAccount(accountInfo,
        currencyEnum, transactionID))
  }

  override function retrieveAllPaymentPlans(policyPeriod : PolicyPeriod) : PaymentPlanData[] {
    return retrieveAllPaymentPlans(policyPeriod.BillingMethod, policyPeriod.AltBillingAccountNumber, policyPeriod.PreferredSettlementCurrency)
  }

  override function retrieveAllPaymentPlans(billingMethod : BillingMethod, altBillingAccountNumber : String, preferredSettlementCurrency : Currency) : PaymentPlanData[] {
    var bcPaymentPlans : PaymentPlanInfo[]
    if (billingMethod == TC_LISTBILL) {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Getting payment plans for account ${altBillingAccountNumber}")
      if(altBillingAccountNumber != null) {
        bcPaymentPlans = BillingAPIWithLanguage.getPaymentPlansForAccount(altBillingAccountNumber,
            getBCCurrencyEnumFor(preferredSettlementCurrency))
      } else {
        return {}
      }
    } else {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Getting all payment plans")
      bcPaymentPlans = BillingAPIWithLanguage.getAllPaymentPlans().where(\ plan ->
        plan.Currency == preferredSettlementCurrency.Code
      )
    }

    return convertBCPaymentPlansToPaymentPlanSummaries(bcPaymentPlans)
  }

  protected function convertBCPaymentPlansToPaymentPlanSummaries(paymentPlans : PaymentPlanInfo[]) : PaymentPlanData[] {
    return paymentPlans.flatMap(\ plan -> convertBCPaymentPlanToPaymentPlanSummary(plan))
  }

  protected function convertBCPaymentPlanToPaymentPlanSummary(bcPaymentPlan: PaymentPlanInfo) : List<PaymentPlanData> {
    // If BC sends us a Reporting plan, we need to find all AuditSchedulePatterns in our system
    // whose PaymentPlanCode matches the PublicID of the BC (Reporting) PaymentPlan. Then,
    // we generate a PC PaymentPlanSummary object for each of these patterns.
    if (bcPaymentPlan.Reporting) {
      var reportingPlans = ReportingPlanCreator.createReportingPlansForPlanId(bcPaymentPlan)
      return reportingPlans
    }
    else { // if it's not a Reporting plan, it's an Installments plan.
      var installmentPlan = new InstallmentPlanDataImpl ()
      // Set the BillingId to the PublicID from BillingCenter
      installmentPlan.BillingId = bcPaymentPlan.PublicID
      installmentPlan.Name = bcPaymentPlan.Name
      installmentPlan.AllowedPaymentMethods = bcPaymentPlan.AllowedPaymentMethods.map(\ s ->
        BillingUtilityMethods.convertPaymentMethodToAccountPaymentMethod(s))?.toTypedArray()
      installmentPlan.BillDateOrDueDateBilling = BillingUtilityMethods.getTypeKeyForBillDateOrDueDateBilling(bcPaymentPlan.BillDateOrDueDateBilling)
      if (bcPaymentPlan.InvoiceFrequency != null) {
        installmentPlan.InvoiceFrequency = typekey.BillingPeriodicity.get(bcPaymentPlan.InvoiceFrequency)
      } // else use the default value from datamodel which is 'monthly'
      return {installmentPlan}
    }
  }

  override function accountExists(accountNumber: String) : boolean {
    return BillingAPIWithLanguage.isAccountExist(accountNumber)
  }

  override function getAvailableBillingMethods(producerCode : String, currency : typekey.Currency) : BillingMethod[] {
    var billingMethods = BillingAPIWithLanguage.getAvailableBillingMethods(producerCode, getBCCurrencyEnumFor(currency))
    var temp = new ArrayList<BillingMethod>()
    if (billingMethods != null) {
      billingMethods.each(\ b -> { temp.add(BillingMethod.get(b)) })
    } else {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error(DisplayKey.get("BillingSystemPlugin.Error.BillingMethodsNotAvailable", producerCode, currency))
    }
    temp.add(BillingMethod.TC_LISTBILL)
    return temp.toTypedArray()
  }

  /**
   * Retrieve installment plans before binding a transaction
   * @param period: policy period
   * @param paymentPlan: payment plan selected
   * @return items, items changed and invoices from other policies
   */
  override function retrieveInstallmentsPlanPreview(policyPeriod : PolicyPeriod, paymentPlan : PaymentPlanData) : BillingPaymentsPreview {
    // Retrieve installment preview plan preview
    var bcInvoiceItems = getInvoiceItems(policyPeriod, paymentPlan.BillingId, policyPeriod.Status != PolicyPeriodStatus.TC_QUOTED)
    var billingPaymentsPreview = convertToBillingPaymentsPreview(bcInvoiceItems, policyPeriod)
    billingPaymentsPreview.PreviewItems = billingPaymentsPreview.PreviewItems.orderBy( \elt -> elt.DueDate).toArray(billingPaymentsPreview.PreviewItems)

    if(policyPeriod.Job.Subtype == typekey.Job.TC_POLICYCHANGE) {
      updateChargesWithPolicyChange(policyPeriod, paymentPlan, billingPaymentsPreview)
    }

    updateWithInvoicesFromOtherPolicies(policyPeriod, paymentPlan, billingPaymentsPreview)

    return billingPaymentsPreview
  }

  /**
  * Issue a policy period in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function createPolicyPeriod(period: PolicyPeriod, transactionID : String) : String {
    var issuePolicyInfo = new IssuePolicyInfo()
    issuePolicyInfo.sync(period)
    PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Sending policy ${period} to Billing System")
    return callUpdate(\ b -> b.issuePolicyPeriod(issuePolicyInfo, transactionID))
  }

  /**
  * Cancel a policy period in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function cancelPolicyPeriod(period: PolicyPeriod, transactionID : String) : void {
    var cancelInfo = new CancelPolicyInfo()
    cancelInfo.sync(period)
    callUpdate(\ b -> b.cancelPolicyPeriod(cancelInfo, transactionID))
  }

  /**
  * Issue a policy change in Billing Center
  * @param period: the policy period
  * @param transactionID: the unique transaction id to make this call idempotent
  */
  override function issuePolicyChange(period: PolicyPeriod, transactionID: String) : void {
    var policyChangeInfo = new PolicyChangeInfo()
    policyChangeInfo.syncPolicyChange(period)
    callUpdate(\ b -> b.changePolicyPeriod(policyChangeInfo,  transactionID))
  }

  override function issueReinstatement(period: PolicyPeriod, transactionID: String) : void {
    var reinstatementInfo = new ReinstatementInfo()
    reinstatementInfo.syncBasicPolicyInfo(period)
    reinstatementInfo.Description = period.Reinstatement.Description

    callUpdate(\ b -> b.reinstatePolicyPeriod(reinstatementInfo,  transactionID))
  }


  override function renewPolicyPeriod(period: PolicyPeriod, transactionID: String) : void {
    var renewalInfo = new RenewalInfo()
    renewalInfo.sync(period)
    renewalInfo.PriorTermNumber = period.BasedOn.TermNumber
    renewalInfo.PriorPolicyNumber = period.BasedOn.PolicyNumber
    callUpdate(\ b -> b.renewPolicyPeriod(renewalInfo,  transactionID))
  }

  override function issueFinalAudit(period: PolicyPeriod, transactionID: String) : void {
    var finalAuditInfo = new FinalAuditInfo()
    finalAuditInfo.syncBasicPolicyInfo(period)

    callUpdate(\ b -> b.issueFinalAudit(finalAuditInfo,  transactionID))
  }

  override function createProducer(organization: Organization, transactionId: String) : String {
    if (not organization.Producer) {
      throw new IllegalArgumentException("Cannot create producer from an non-producer organization")
    }
    var producerInfo = new PCNewProducerInfo()
    producerInfo.syncNew(organization)
    return callUpdate(\ b -> b.createProducer(producerInfo,  transactionId))
  }

  override function retrieveAllAgencyBillPlans() : AgencyBillPlanSummary[] {
    return BillingAPIWithLanguage.getAllAgencyBillPlans()
      .map(\ p -> {
        final var summary = new AgencyBillPlanSummary()
        summary.syncCurrency(p)
        return summary
      })
  }

  override function syncOrganization(organization : Organization) {
    if (organization.New) {
      return
    }

    var producerInfo : PCProducerInfo
    try {
      producerInfo = BillingAPIWithLanguage.getProducerInfo(organization.PublicID)
    } catch (e : BadIdentifierException) {
      return
    }
    final var syncedAgencyBillPlansByCurrency =
        producerInfo.AgencyBillPlanInfos.partitionUniquely(\ planInfo -> Currency.get(planInfo.Currency))
    // sync' each currency-specific AgencyBillPlan with the billing system...
    organization.AgencyBillPlans.each(\ billPlan -> {
      final var syncedAgencyBillPlanID = syncedAgencyBillPlansByCurrency[billPlan.Currency].PublicID
      if (billPlan.PlanID != syncedAgencyBillPlanID) {
        billPlan.PlanID = syncedAgencyBillPlanID
      }
    })
    // check for new AgencyBillPlans set by BillingCenter...
    final var newCurrencies = syncedAgencyBillPlansByCurrency.Keys
    newCurrencies.removeAll(Arrays.asList(organization.AgencyBillPlans*.Currency))
    newCurrencies.each(\ currency ->
      organization.addToAgencyBillPlans(new AgencyBillPlan() {
        : PlanID = syncedAgencyBillPlansByCurrency[currency].PublicID,
        : Currency = currency
      })
    )
  }

  override function updateProducer(organization: Organization, transactionId : String) : void {
    if (not organization.Producer) {
      throw new IllegalArgumentException("Cannot create producer from an non-producer organization")
    }
    var producerInfo = new PCProducerInfo()
    producerInfo.sync(organization)
    callUpdate(\ b -> b.updateProducer(producerInfo, transactionId))
  }

  override function producerExists(producerId: String) : boolean {
    return BillingAPIWithLanguage.isProducerExist(producerId)
  }

  override function createProducerCode(producerCode: ProducerCode, transactionId: String) : String {
    var producerCodeInfo = new NewProducerCodeInfo()
    producerCodeInfo.sync(producerCode)
    return callUpdate(\ b -> b.createProducerCode(producerCodeInfo, transactionId))
  }

  override function retrieveAllCommissionPlans() : CommissionPlanSummary[] {
    return BillingAPIWithLanguage.getAllCommissionPlans()
      .map(\ plan -> {
        var summary = new CommissionPlanSummary()
        summary.sync(plan)
        return summary
      })
  }

  override function syncProducerCode(producerCode : ProducerCode) {
    if (producerCode.New) {
      return
    }

    var producerCodeInfo : ProducerCodeInfo
    try {
      producerCodeInfo = BillingAPIWithLanguage.getProducerCodeInfo(producerCode.PublicID)
    } catch (e : BadIdentifierException) {
      return
    }
    final var syncedCommissionPlansByCurrency =
        producerCodeInfo.CommissionPlanInfos.partitionUniquely(\ planInfo -> Currency.get(planInfo.Currency))
    // sync' each currency-specific CommissionPlan with the billing system...
    producerCode.CommissionPlans.each(\ codePlan -> {
      final var syncedCommissionPlanID = syncedCommissionPlansByCurrency[codePlan.Currency].PublicID
      if (codePlan.CommissionPlanID != syncedCommissionPlanID) {
        codePlan.CommissionPlanID = syncedCommissionPlanID
      }
    })
  }

  override function updateProducerCode(producerCode: ProducerCode, transactionId : String) : void {
    var producerCodeInfo = new ProducerCodeInfo()
    producerCodeInfo.PublicID = producerCode.PublicID
    producerCodeInfo.Code = producerCode.Code
    producerCodeInfo.Currencies = producerCode.Currencies*.Code.toList()
    producerCodeInfo.CommissionPlanIDs = producerCode.CommissionPlanIDs.toList()
    var status = producerCode.ProducerStatus
    producerCodeInfo.Active = status == ProducerStatus.TC_ACTIVE or status ==  ProducerStatus.TC_LIMITED
    callUpdate(\ b -> b.updateProducerCode(producerCodeInfo, transactionId))
  }

  override function updateAccount(account: Account, transactionId: String) : void {
    var accountInfo = new PCAccountInfo()
    accountInfo.sync(account)
    callUpdate(\ b -> b.updateAccount(accountInfo, transactionId))
  }

  override function rewritePolicyPeriod(period: PolicyPeriod, transactionId: String) : void {
    var renewalInfo = new RewriteInfo()
    renewalInfo.sync(period)
    renewalInfo.PriorTermNumber = period.BasedOn.TermNumber
    renewalInfo.PriorPolicyNumber = period.BasedOn.PolicyNumber

    callUpdate(\ b -> b.rewritePolicyPeriod(renewalInfo, transactionId))
  }

  override function issuePremiumReport(period: PolicyPeriod, transactionId: String) : void {
    var premiumReportInfo = new PremiumReportInfo()
    premiumReportInfo.sync(period)
    callUpdate(\ b -> b.issuePremiumReport(premiumReportInfo, transactionId))
  }

  override function updateContact(contact: Contact, transactionId: String) : void {
    var updateContactInfo = new PCContactInfo()
    updateContactInfo.sync(contact)
    callUpdate(\ b -> b.updateContact(updateContactInfo, transactionId))
  }

  override function waiveFinalAudit(period: PolicyPeriod, transactionId: String) : void {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    policyPeriodInfo.PCPolicyPublicID = period.Policy.PublicID
    callUpdate(\ b -> b.waiveFinalAudit(policyPeriodInfo, transactionId))
  }

  override function scheduleFinalAudit(period: PolicyPeriod, transactionId: String) : void {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    policyPeriodInfo.PCPolicyPublicID = period.Policy.PublicID
    callUpdate(\ b -> b.scheduleFinalAudit(policyPeriodInfo, transactionId))
  }

  override function getPeriodInfo(period: PolicyPeriod) : PolicyPeriodBillingInfo {
    var policyPeriodInfo = new PCPolicyPeriodInfo()
    policyPeriodInfo.PolicyNumber = period.PolicyNumber
    policyPeriodInfo.TermNumber = period.TermNumber
    policyPeriodInfo.PCPolicyPublicID = period.Policy.PublicID
    var bcPeriod = BillingAPIWithLanguage.getPolicyPeriod(policyPeriodInfo)
    if (bcPeriod == null) {
      return null
    }
    return new PolicyPeriodBillingInfo() {
      :BillingMethod = typekey.BillingMethod.get(bcPeriod.BillingMethodCode),
      :PaymentPlanID = bcPeriod.PaymentPlanPublicId,
      :AltBillingAccountNumber = bcPeriod.AltBillingAccountNumber,
      :InvoiceStreamCode = bcPeriod.InvoiceStreamId
    }
  }

  override function transferPolicyPeriods(accountNumber : String,
                                  periods : PolicyPeriod[], transactionId : String) {
    var policyPeriodInfos = periods
        // filter out the periods should not be sent to BC
        .where(\p -> p.ShouldSendToBillingSystem)
        .map(\p -> new PCPolicyPeriodInfo() {
          :TermNumber = p.TermNumber,
          :PolicyNumber = p.PolicyNumber,
          :PCPolicyPublicID = p.Policy.PublicID
        })
    if (not policyPeriodInfos.IsEmpty) {
      callUpdate(\b -> {
        b.transferPolicyPeriods(policyPeriodInfos, accountNumber, transactionId)
        return null
      })
    }
  }

  override function setDownPaymentInstallmentTotalForAllInstallmentsPlans(period : PolicyPeriod, paymentPlans: PaymentPlanData[]) {
    paymentPlans.InstallmentPlans.each(\ paymentPlanData -> {
      try {
        var installmentPlan = paymentPlanData as InstallmentPlanDataImpl
        final var bcInvoiceItems = getInvoiceItems(period, installmentPlan.BillingId, false)
        final var billingPaymentsPreview = convertToBillingPaymentsPreview(bcInvoiceItems, period)
        installmentPlan.DownPayment = billingPaymentsPreview.getTypeTotal(InvoiceItemType.Deposit.GosuValue, period)
        installmentPlan.Installment = billingPaymentsPreview.getTypeAmount(InvoiceItemType.Installment.GosuValue, period)
        installmentPlan.Fee = billingPaymentsPreview.getCategoryAmount(ChargeCategory.Fee.GosuValue, period)
        installmentPlan.OneTimeFee = billingPaymentsPreview.getOneTimeCategoryAmount(ChargeCategory.Fee.GosuValue, period)
        installmentPlan.TotalFees = billingPaymentsPreview.getCategoryTotal(ChargeCategory.Fee.GosuValue, period)
        installmentPlan.Tax = billingPaymentsPreview.getOneTimeCategoryAmount(ChargeCategory.Tax.GosuValue, period)
        installmentPlan.Total = billingPaymentsPreview.getTotal(period)
        installmentPlan.NumberOfInstallments = billingPaymentsPreview.getNumberOfPreviewItemsOfType(InvoiceItemType.Installment.GosuValue)
      } catch (bie : BadIdentifierException) {
        PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error("Could not set down payment information for : " + paymentPlanData.Name, bie)
      } catch (wf : WsdlFault) {
        PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error("Wsdl Fault: Could not set down payment information for : " + paymentPlanData.Name, wf)
      }
    })
  }

  override function getSubAccounts(parentAccountNumber: String) : BillingAccountSearchResult[] {
    if (parentAccountNumber == null) {
      throw new IllegalStateException("This method should never be called will null account number.")
    }
    return BillingAPIWithLanguage.getAllSubAccounts(parentAccountNumber)
        .map(\ b -> new BCBillingAccountSearchResult(b))
  }

  override function getSubAccounts(parentAccountNumber : String, currency : Currency) : BillingAccountSearchResult[] {
    if (parentAccountNumber == null) {
      throw new IllegalStateException("This method should never be called will null account number.")
    }
    return BillingAPIWithLanguage.getAllSubAccountsForCurrency(parentAccountNumber, getBCCurrencyEnumFor(currency))
        .map(\ b -> new BCBillingAccountSearchResult(b))
  }

  override function getInvoiceStreams(accountNumber : String, currency : Currency, paymentPlan : PaymentPlanData) : BillingInvoiceStreamInfo[] {
    if (accountNumber == null) {
      throw new IllegalStateException("This method should never be called will null account number.")
    }
    PCLoggerCategory.BILLING_SYSTEM_PLUGIN.info("Getting invoice streams for account: ${accountNumber}")
    var infos = BillingAPIWithLanguage.getAccountInvoiceStreams(accountNumber, getBCCurrencyEnumFor(currency), paymentPlan.BillingId)
    return infos.map(\ i -> new BCBillingInvoiceStreamInfo(i))
  }

  /**
   * This method expect the specific BillingAccountSearchCriteria implementation of the
   * BillingAccountSearchCriteriaJava interface, not just some implementation.
   */
  override function searchForAccounts(criteria: BillingAccountSearchCriteriaJava, limit: Integer): BillingAccountSearchResult[] {
    if (criteria typeis BillingAccountSearchCriteria) {
      var bcCriteria = new BCAccountSearchCriteria() {
          :AccountName = criteria.AccountName,
          :AccountNameKanji = criteria.AccountNameKanji,
          :AccountNumber = criteria.AccountNumber,
          :IsListBill = criteria.ListBill,
          :Currency = getBCCurrencyEnumFor(criteria.Currency)
      }
      var bcResults = BillingAPIWithLanguage.searchForAccounts(bcCriteria, limit)
      return bcResults.map(\b -> new BCBillingAccountSearchResult(b))
    } else {
      throw new IllegalStateException("Criteria should be of gosu type: ${typeof BillingAccountSearchCriteria}")
    }
  }

  override function getExistingPaymentInstruments(accountNumber : String, currency : Currency) : BillingPaymentInstrument[] {
    if (accountNumber == null) {
      throw new IllegalStateException("This method should never be called will null account number.")
    }
    var instruments = BillingAPIWithLanguage.getAccountPaymentInstruments(accountNumber, getBCCurrencyEnumFor(currency))
    return instruments
      .where(\ p -> p.PaymentMethod != wsi.remote.gw.webservice.bc.bc900.billingapi.enums.PaymentMethod.Responsive) // filter out responsive
      .map(\ p -> createBillingPaymentInstrument(p))
  }

  @SuppressWarnings({"all"})
  override function addPaymentInstrumentTo(accountNumber : String, currency : Currency, paymentInstrument : BillingPaymentInstrument) : BillingPaymentInstrument {
    var accountExist = accountExists(accountNumber)
    if (not accountExist) {
      var account = Account.finder.findAccountByAccountNumber(accountNumber)
      createAccount(account, null)
    }

    if (paymentInstrument.PaymentMethod == AccountPaymentMethod.TC_UNSUPPORTED) {
      throw new IllegalStateException(DisplayKey.get("BillingSystemPlugin.Error.UnsupportedPaymentMethod"))
    }
    var bcInstrument = new wsi.remote.gw.webservice.bc.bc900.billingapi.types.complex.PaymentInstrumentRecord() {
      :PaymentMethod = wsi.remote.gw.webservice.bc.bc900.billingapi.enums.PaymentMethod.forGosuValue(paymentInstrument.PaymentMethod.Code),
      :OneTime = false,
      :Token = paymentInstrument.Token,
      :Detail = paymentInstrument.Detail
    }
    bcInstrument = BillingAPIWithLanguage.createPaymentInstrumentOnAccount(accountNumber, getBCCurrencyEnumFor(currency), bcInstrument)
    return createBillingPaymentInstrument(bcInstrument)
  }

  override function updatePolicyPeriodTermConfirmed(policyNumber : String, termNumber : int,
                                           isConfirmed : boolean) : void{
    BillingAPIWithLanguage.updatePolicyPeriodTermConfirmed(policyNumber, termNumber, isConfirmed)
  }

  protected function createBillingPaymentInstrument(p : wsi.remote.gw.webservice.bc.bc900.billingapi.types.complex.PaymentInstrumentRecord) : BillingPaymentInstrument {
    var paymentMethod = p.PaymentMethod.GosuValue
    return new BillingPaymentInstrumentImpl(){
        :PublicID = p.PublicID,
        :PaymentMethod = BillingUtilityMethods.convertPaymentMethodToAccountPaymentMethod(paymentMethod),
        :OneTime = p.OneTime,
        :DisplayName = p.DisplayName,
        :Token = p.Token,
        :Detail = p.Detail
    }
  }

  override function retrieveAccountUnappliedFunds(accountNumber : String, currency : Currency) : BillingUnappliedFundInfo[] {
    if (accountNumber == null) {
      throw new IllegalStateException("This method should never be called will null account number.")
    }
    var unappliedFundInfos = BillingAPIWithLanguage.getUnappliedFunds(accountNumber, getBCCurrencyEnumFor(currency))
    return unappliedFundInfos.map(\ info -> new BCUnappliedFundWrapper(info))
  }

  override function supportsSpecialHandlingForChangeInCost() : boolean {
    return false
  }

  override function getBillingLevel(accountNumber : String) : BillingLevel {
    return null
  }

  private function getBCCurrencyEnumFor(currency: typekey.Currency) : wsi.remote.gw.webservice.bc.bc900.billingapi.enums.Currency {
    return wsi.remote.gw.webservice.bc.bc900.billingapi.enums.Currency.forGosuValue(currency.Code)
  }

  private function convertToPolicyCenterPaymentPreviewItems(
      bcInvoiceItems : InvoiceSummaryItem[], expectedCurrency : Currency) : PaymentPreviewItem[] {
    return bcInvoiceItems.map(\ invItem ->
        new PaymentPreviewItem(
            invItem.InvoiceDate,
            invItem.InvoiceDueDate,
            invItem.Amount.convertAmount(expectedCurrency),
            invItem.Type.GosuValue,
            invItem.Category.GosuValue) {
            :TypeDisplay = invItem.TypeDisplay,
            :ChargeCategoryDisplay = invItem.CategoryDisplay
            }
    )
  }

  private function convertToBillingPaymentsPreview(
      bcInvoiceItems : InvoiceSummaryItem[], policyPeriod : PolicyPeriod) : BillingPaymentsPreview {
    return new BillingPaymentsPreview(true,
        convertToPolicyCenterPaymentPreviewItems(bcInvoiceItems, policyPeriod.PreferredSettlementCurrency))
  }

  private function getInvoiceItems(period : PolicyPeriod, billingId : String, zeroingCharges : Boolean) : InvoiceSummaryItem[] {
    switch (period.Job.Subtype) {
      case typekey.Job.TC_ISSUANCE:
      case typekey.Job.TC_POLICYCHANGE:
          var info = new PolicyChangeInfo()
          info.syncPolicyChangeForPreview(period)
          if(zeroingCharges) {
            info.ChargeInfos = {}
          }
          return BillingAPIWithLanguage.previewPolicyChangeInvoices(info)
      case typekey.Job.TC_REINSTATEMENT:
          var info = new ReinstatementInfo()
          info.syncBasicPolicyInfo(period)
          if(zeroingCharges) {
            info.ChargeInfos = {}
          }
          return BillingAPIWithLanguage.previewReinstatementInvoices(info)
      case typekey.Job.TC_RENEWAL:
          var info = new RenewalInfo()
          info.syncForPreview(period, billingId)
          if(zeroingCharges) {
            info.ChargeInfos = {}
          }
          info.PriorTermNumber = period.BasedOn.TermNumber
          info.PriorPolicyNumber = period.BasedOn.PolicyNumber
          return BillingAPIWithLanguage.previewRenewalInvoices(info)
      case typekey.Job.TC_REWRITE:
      case typekey.Job.TC_REWRITENEWACCOUNT:
          var info = new RewriteInfo()
          info.syncForPreview(period, billingId)
          if(zeroingCharges) {
            info.ChargeInfos = {}
          }
          info.PriorTermNumber = period.BasedOn.TermNumber
          info.PriorPolicyNumber = period.BasedOn.PolicyNumber
          return BillingAPIWithLanguage.previewRewriteInvoices(info)
      case typekey.Job.TC_SUBMISSION:
          if (period.Promoted) {
            // Using the policyChange api with charges set to empty as BC does not provide a preview for bound policies
            var info = new PolicyChangeInfo()
            info.syncPolicyChangeForPreview(period)
            info.ChargeInfos = {}
            return BillingAPIWithLanguage.previewPolicyChangeInvoices(info)
          } else {
            var info = new IssuePolicyInfo()
            info.syncForPreview(period, billingId)
            if(zeroingCharges) {
              info.ChargeInfos = {}
            }
            return BillingAPIWithLanguage.previewIssuanceInvoices(info)
          }
      case Job.TC_CANCELLATION:
        var info = new CancelPolicyInfo()
        info.sync(period)
        if(zeroingCharges) {
          info.ChargeInfos = {}
        }
        return BillingAPIWithLanguage.previewCancellationInvoices(info)
      default:
        throw new IllegalArgumentException("Job subtype '" + period.Job.Subtype + "' not supported" )
    }
  }

  /**
   * Retrieve invoices from other policies
   * @param period: policy period
   * @param BillingId: id of the billing plan selected
   * @param from: lower limit of the invoices to retrieve
   * @param to: upper limit of the invoices to retrieve
   * @return invoices from other policies of this account
   */
  private function getInvoicesOtherPolicies(policyPeriod : PolicyPeriod, BillingId : String, from : Date, to : Date) : InvoiceSummaryItem[] {
    var bcInvoiceOtherItems = new InvoiceSummaryItem[0]

    policyPeriod.Policy.Account.Policies.where(
        \elt -> elt.LatestPeriod.PolicyNumber != policyPeriod.PolicyNumber).each(
        \elt2 -> {
          var tmp = getInvoiceItems(elt2.LatestPeriod, BillingId, true).where(
              \elt3 -> elt3.InvoiceDueDate.afterOrEqual(from) and elt3.InvoiceDueDate.beforeOrEqual(to))
          var bcInvoiceOtherItemsLength = bcInvoiceOtherItems.length
          bcInvoiceOtherItems = Arrays.copyOf(bcInvoiceOtherItems, bcInvoiceOtherItems.length + tmp.length)
          for (el in tmp index i) {
            bcInvoiceOtherItems[bcInvoiceOtherItemsLength + i] = el
          }
        })

    return bcInvoiceOtherItems
  }

  /**
   * Calculate the changes of the policy by subtracting the previous charges to the new charges of this change
   * @param period: policy period
   * @param paymentPlan: payment plan selected
   * @param billingPaymentsPreview: Contains items to be shown in the preview
   */
  private function updateChargesWithPolicyChange(policyPeriod : PolicyPeriod, paymentPlan : PaymentPlanData, billingPaymentsPreview : BillingPaymentsPreview) {
    var bcInvoiceItemsOrig = getInvoiceItems(policyPeriod, paymentPlan.BillingId, true)
    var pcPaymentPreviewItemsOrig = convertToPolicyCenterPaymentPreviewItems(bcInvoiceItemsOrig, policyPeriod.PreferredSettlementCurrency)
    pcPaymentPreviewItemsOrig = pcPaymentPreviewItemsOrig.orderBy( \elt -> elt.DueDate).toArray(pcPaymentPreviewItemsOrig)

    var pcPaymentPreviewItems = billingPaymentsPreview.PreviewItems
    var pcPaymentPreviewItemsChanged = new PaymentPreviewItem[pcPaymentPreviewItems.length]
    pcPaymentPreviewItems.eachWithIndex(\item, i -> { pcPaymentPreviewItemsChanged[i] = item })
    pcPaymentPreviewItemsChanged.each(\chg -> {
      pcPaymentPreviewItemsOrig.where(\org ->
          chg.DueDate == org.DueDate and
              chg.Type == org.Type and
              chg.ChargeCategory == org.ChargeCategory).each(\res -> {
        chg.Amount = chg.Amount - res.Amount })
    })

    billingPaymentsPreview.PreviewItems = pcPaymentPreviewItemsOrig
    billingPaymentsPreview.PreviewItemsChanged = pcPaymentPreviewItemsChanged.where(\elt -> elt.Amount != new MonetaryAmount(0, policyPeriod.PreferredSettlementCurrency))
  }

  /**
   * Retrieve invoices from other policies
   * @param period: policy period
   * @param paymentPlan: payment plan selected
   * @param billingPaymentsPreview: Contains items to be shown in the preview
   */
  private function updateWithInvoicesFromOtherPolicies(policyPeriod : PolicyPeriod, paymentPlan : PaymentPlanData, billingPaymentsPreview : BillingPaymentsPreview) {
    var fromDate = policyPeriod.PeriodStart
    var toDate = fromDate
    if (billingPaymentsPreview.PreviewItemsChanged.HasElements) {
      fromDate = billingPaymentsPreview.PreviewItemsChanged.first().DueDate
      toDate = billingPaymentsPreview.PreviewItemsChanged.last().DueDate
    } else if (billingPaymentsPreview.PreviewItems.HasElements) {
      fromDate = billingPaymentsPreview.PreviewItems.first().DueDate
      toDate = billingPaymentsPreview.PreviewItems.last().DueDate
    } else {
      return
    }
    var bcInvoiceOtherPolicies = getInvoicesOtherPolicies(policyPeriod, paymentPlan.BillingId, fromDate, toDate)
    var pcInvoicesOtherPolicies = convertToPolicyCenterPaymentPreviewItems(bcInvoiceOtherPolicies, policyPeriod.PreferredSettlementCurrency)
    pcInvoicesOtherPolicies = pcInvoicesOtherPolicies.orderBy( \elt -> elt.DueDate).toArray(pcInvoicesOtherPolicies)
    billingPaymentsPreview.InvoicesOtherPolicies = pcInvoicesOtherPolicies
  }
}
