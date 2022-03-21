package gw.billing

uses gw.api.locale.DisplayKey
uses gw.api.util.LocationUtil
uses gw.api.util.MonetaryAmounts
uses gw.billing.caching.BillingPaymentPlansCache
uses gw.billing.paymentplansstate.AbstractPaymentPlansState
uses gw.billing.paymentplansstate.PaymentPlansState
uses gw.billing.paymentplansstate.PaymentPlansStateFactory
uses gw.pl.currency.MonetaryAmount
uses gw.pl.persistence.core.Bundle
uses gw.plugin.Plugins
uses gw.plugin.billing.InstallmentPlanData
uses gw.plugin.billing.PaymentPlanData
uses gw.plugin.billing.ReportingPlanData
uses gw.plugin.policy.IPolicyPaymentPlugin

uses java.math.BigDecimal

/**
 * PaymentPlansStateContainer manages the collections of payment plans, their selection and the implications of the different
 * types of plans.  Internally, it uses a PaymentPlansState to determine how to act based on the type of plan chosen.
 * As part of managing PaymentPlans, the Container also takes care of calls to the Plugin and caching the results
 */
@Export
class PaymentPlansStateContainerImpl implements PaymentPlansStateContainer, PaymentPlansState {
  delegate  _paymentPlansState : AbstractPaymentPlansState represents PaymentPlansState
  var _container : PolicyPeriodBillingInstructionsManager as Container
  var _paymentPlan : PaymentPlanData as PaymentPlanChoice
  var _paymentMethod:  PaymentMethod as PaymentMethodChoice
  var _installmentPlans : InstallmentPlanData[] as InstallmentPlans
  var _reportingPlans : ReportingPlanData[] as ReportingPlans
  var _paymentPlansCache : BillingPaymentPlansCache

  construct(container : PolicyPeriodBillingInstructionsManager) {
    _container = container
    _paymentPlansState = PaymentPlansStateFactory.createPaymentPlansState(null, this)
    _paymentPlansCache = new BillingPaymentPlansCache()
    _paymentPlansCache.setExpireAfterRead(5)
  }

  property get Bundle() : Bundle {
    return Container.Bundle
  }

  /**
   * Populate the Payment Plan values in the UI based on the PolicyPeriod values.
   *
   * @param period
   */
  function initializePaymentPlanFromPeriod(period : PolicyPeriod) {
    if (period.SelectedPaymentPlan.IsInstallmentsPlan) {
      PaymentPlanChoice = _installmentPlans.firstWhere(\elt -> elt.BillingId == period.SelectedPaymentPlan.BillingId)
    } else {
      PaymentPlanChoice = _reportingPlans.getByReportingPatternCode(period.SelectedPaymentPlan.ReportingPatternCode)
    }
    resetPaymentMethod()
    if (_paymentPlan == null) {
      chooseDefaultPaymentPlan()
      resetPaymentMethod()
    }
  }

  /**
   * Populate the Payment Plan values in the UI based on the PolicyPeriod values. This method assumes that the passed-in
   * period is bound.
   *
   * @param period
   */
  protected function initializePaymentPlanFromBoundPeriod(period: PolicyPeriod) {
    // For Bound periods, we populate the PaymentPlansStateContainer from the SelectedPaymentPlan.
    // If no available payment plan was previously returned from BC, period.SelectedPaymentPlan is null.
    PaymentPlanChoice = period.SelectedPaymentPlan?.asPaymentPlanData()
    PaymentMethodChoice = period.SelectedPaymentPlan?.PaymentPlanType
  }

  function saveStateToPolicyPeriod(period : PolicyPeriod) {
    period.selectPaymentPlan(PaymentPlanChoice)
    _paymentPlansState.saveStateToPolicyPeriod(period)
  }

  property set PaymentPlanChoice(plan : PaymentPlanData) {
    _paymentPlan = plan
    updatePaymentPlansState()
  }

  property set ReportingPlanChoice(plan : ReportingPlanData) {
    PaymentPlanChoice = plan
  }

  function selectPaymentPlan(plan : PaymentPlanData) {
    PaymentPlanChoice = plan
    resetPaymentMethod()
    _paymentPlansState.refreshContainer()
  }

  function updateInvoiceStreamAccordingToPaymentPlan() {
    Container.updateInvoiceStreamAccordingToPaymentPlan(PaymentPlanChoice)
  }

  function clearInvoiceStreamOverridesAttributes() {
    Container.clearInvoiceStreamOverridesAttributes()
  }

  function setFieldsFromNewReportingPlan() {
    Container.setFieldsFromNewReportingPlan()
  }

  function updateUpFrontPaymentStateContainer() {
    Container.updateUpFrontPaymentStateContainer()
  }

  property get DepositOverridePct() : BigDecimal {
    return Container.DepositOverridePct
  }

  private function updatePaymentPlansState() {
    _paymentPlansState = _paymentPlansState.updateUsing(PaymentPlanChoice, this)
  }

  function resetPaymentMethod() {
    _paymentMethod = getResetPaymentMethod()
  }

  private function getResetPaymentMethod() : PaymentMethod {
    // For List Bill, payment method option is available only if alt billing account is selected.
    // By default, if no alt account is selected, we just show empty installment plans
    if (Container.MissingRequiredAltBillingAccount) {
      return PaymentMethod.TC_INSTALLMENTS
    }
    var result = _paymentPlansState.getResetPaymentMethod()
    if (result == null and Container.BillingMethod != null) {
      LocationUtil.addRequestScopedErrorMessage(DisplayKey.get("Web.BillingAdjustmentsDV.Error.RetrievePaymentPlans"))
    }
    return result
  }

  property get InstallmentPlan() : InstallmentPlanData {
    return (_paymentPlan != null and _paymentPlan.InstallmentsPlan) ? _paymentPlan as InstallmentPlanData : null
  }

  property get InstallmentFees() : MonetaryAmount {
    return InstallmentPlan == null || InstallmentPlan.TotalFees == null
        ? MonetaryAmounts.zeroOf(Container.PreferredSettlementCurrency)
        : InstallmentPlan.TotalFees;
  }

  /**
   * Return an array either containing the selected {@link InstallmentPlanData} or empty if it is a {@ReportingPlanData}
   * or nothing was selected in the first place.
   *
   * @return An array containing the selected installment plan if it exists
   */
  property get MaybeGetInstallmentPlanAsArray() : InstallmentPlanData[] {
    if (PaymentPlanChoice == null or PaymentPlanChoice.ReportingPlan) {
      return {}
    }
    return {PaymentPlanChoice as InstallmentPlanData}
  }

  function chooseDefaultPaymentPlan() {
    if (PaymentMethodChoice == TC_INSTALLMENTS) {
      PaymentPlanChoice = _installmentPlans.first()
      updateInvoiceStreamAccordingToPaymentPlan()
    } else if (PaymentMethodChoice == PaymentMethod.TC_REPORTINGPLAN) {
      PaymentPlanChoice = _reportingPlans.first()
      setFieldsFromNewReportingPlan()
      updateInvoiceStreamAccordingToPaymentPlan()
    } else {
      PaymentPlanChoice = null
    }
  }

  property get HasBothInstallmentsAndReportPlans() : boolean {
    return _reportingPlans.HasElements and _installmentPlans.HasElements
  }

  private function getValidPaymentPlans(paymentPlans : PaymentPlanData[]) : PaymentPlanData[] {
    return paymentPlans.where(\plan -> !plan.InstallmentsPlan or (plan as InstallmentPlanData).DownPayment != null)
  }

  /**
   * Retrieve the available payment plans from Billing System and set the billing preview fields
   * (Downpayment, Installments, Total).
   */
  function updateAvailablePaymentPlans() {
    var paymentPlans = retrievePaymentPlansWithoutSettingBillingAmounts()
    updateBillingAmountsOnInstallmentPlans(paymentPlans)
    paymentPlans = getValidPaymentPlans(paymentPlans)
    _installmentPlans = paymentPlans.InstallmentPlans
    _reportingPlans = paymentPlans.ReportingPlans
  }

  /**
   * This method should be private.  It is only protected for testing purposes
   */
  protected function retrievePaymentPlansWithoutSettingBillingAmounts() : PaymentPlanData[] {
    var accountNumber = Container.BillingAccountNumber
    if (accountNumber.isEmpty() or Container.MissingRequiredAltBillingAccount) {
      return {}
    }

    var allPaymentPlans = _paymentPlansCache.getPaymentPlans(Container.BillingMethod, accountNumber, Container.PreferredSettlementCurrency)

    // Call the plugin to filter out unwanted plans
    return Plugins.get(IPolicyPaymentPlugin).filterReportingPlans(Container.PeriodInternal, allPaymentPlans);
  }

  /**
   * This method creates a copy of the period in a different bundle, pushes the current state to that period and then
   * uses it to updateBillingAmounts.  It seemed very difficult to untangle all the different parameters needed by
   * the plugin call, so we found a way to continue using the policy period.
   * @param paymentPlans
   */
  private function updateBillingAmountsOnInstallmentPlans(paymentPlans : PaymentPlanData[]) {
    var period = Container.RepresentativePolicyPeriod
    // Always use the DefaultBilling InvoicingMethod to get the billing amounts. We don't want to use any
    // Invoice Stream Overrides or Custom Billing values for this. The billing amounts should not be effected by the
    // InvoicingMethod.
    period.InvoicingMethod = TC_DEFAULTBILLING
    if (Container.Initializing) {
      period.updateBillingAmountsOnInstallmentsPlans(paymentPlans)
    } else {
      if (paymentPlans?.HasElements
          and period.SelectedPaymentPlan != null
          and !paymentPlans.contains(period.SelectedPaymentPlan.asPaymentPlanData())) {
        period.selectPaymentPlan(paymentPlans.first())
      }
      period.updateBillingAmountsOnInstallmentsPlans(paymentPlans)
    }
  }

  function invalidateCaches() {
    _paymentPlansCache.invalidate()
  }
}