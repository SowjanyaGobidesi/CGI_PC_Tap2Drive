package gw.web.contact.impl

uses gw.api.database.QuerySelectColumns
uses gw.api.locale.DisplayKey
uses gw.api.path.Paths
uses gw.api.web.filter.TypeFilter
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.BCAccountBillingDisplayTotals
uses gw.web.contact.CommonMetrics
uses typekey.Currency

/**
 * Collects the Policy Metrics for the Account.
 */
@Export
abstract class CommonMetricsImpl implements CommonMetrics {
  abstract property get BillingTotals(): BCAccountBillingDisplayTotals
  abstract property get PolicyMetrics(): PolicyMetricsCollectorBase
  abstract property get Currency(): Currency

  final var _claimMetrics = ClaimMetricsCollector.Instance

  var _firstEffectivePolicyDate: Date as readonly FirstEffectivePolicyDate
  var _activePoliciesCount: int as readonly ActivePoliciesCount
  var _inForcePoliciesCount: int as readonly InForcePoliciesCount
  var _totalInForcePremium: MonetaryAmount as readonly TotalInForcePremium
  var _totalInForcePremiumConverted: boolean as readonly TotalInForcePremiumConverted
  var _cancellationsByCustomerCount: int as readonly CancellationsByCustomerCount
  var _cancellationsForNonPaymentCount: int as readonly CancellationsForNonPaymentCount
  var _otherCancellationsCount: int as readonly OtherCancellationsCount
  var _openCancellationsCount: int = 0
  var _totalLifetimePremium: MonetaryAmount as readonly TotalLifetimePremium
  var _lifetimePremiumConverted: boolean as readonly LifetimePremiumConverted
  var _jobs: List<Job> as readonly Jobs
  var _openClaimsCount: int as readonly OpenClaimsCount = -1
  var _netTotalIncurred: MonetaryAmount as readonly NetTotalIncurred
  var _shouldCreateClaimAlert: boolean = false
  var _totalUnbilled: MonetaryAmount as readonly TotalUnbilled
  var _totalCurrentlyBilled: MonetaryAmount as readonly TotalCurrentlyBilled
  var _totalPastDueBilled: MonetaryAmount as readonly TotalPastDueBilled
  var _totalOutstandingBilled: MonetaryAmount as readonly TotalOutstandingBilled
  var _billingAmountsConverted: boolean as readonly BillingAmountsConverted
  var _directBillOnly: boolean as readonly DirectBillOnly
  var _recentDelinquencies: int
  var _recentDelinquenciesAvailable : boolean
  var _alerts: List<String> = {}

  static final var CancellationsByCustomerFilter = CancellationsFilter.cancellationsByCustomer()
  static final var CancellationsForNonPaymentFilter = CancellationsFilter.cancellationsForNonPayment()
  static final var OtherCancellationsFilter = CancellationsFilter.otherCancellations()

  override property get Alerts(): List<String> {
    return Collections.unmodifiableList(_alerts)
  }

  function initialize() {
    initializePolicyMetrics()
    initializeClaimMetrics()
    initializeBillingMetrics()
    createAlerts()
  }

  /**
   * Initialize the claim metrics.
   */
  protected function initializeClaimMetrics() {
    /* set of distinct, unique PolicyNumber's (as a List)... */
    var policyNumbers =
        PolicyMetrics.activePolicyPeriodsQuery()
            .withDistinct(true)
            .select({QuerySelectColumns.path(Paths.make(PolicyPeriod#PolicyNumber))}).transformQueryRow(\row -> row.getColumn(0) as String)

    var claimSet = _claimMetrics.findRecentClaims(policyNumbers.toSet())
    if (claimSet != null) {
      _openClaimsCount = claimSet.Claims.Count
      _netTotalIncurred = _claimMetrics.calculateTotalIncurred(Currency, claimSet.Claims)
      _shouldCreateClaimAlert = true
    }
  }

  /**
   * Initialize the billing metrics.
   */
  protected function initializeBillingMetrics() {
    var billingTotals = BillingTotals
    _totalUnbilled = billingTotals.UnbilledTotal.Total
    _totalCurrentlyBilled = billingTotals.BilledOutstandingCurrent.Total
    _totalPastDueBilled = billingTotals.BilledOutstandingPastDue.Total
    _totalOutstandingBilled = billingTotals.BilledOutstandingTotal.Total
    _billingAmountsConverted = billingTotals.AccountBalancesConverted
    _directBillOnly = true
    _recentDelinquencies = billingTotals.RecentDelinquencies
    _recentDelinquenciesAvailable = billingTotals.AccountNumbers.HasElements and billingTotals.RecentDelinquencies >= 0
  }

  /**
   * Initialize the policy metrics.
   */
  protected function initializePolicyMetrics() {
    _firstEffectivePolicyDate = PolicyMetrics.firstEffectivePolicyDate()
    _activePoliciesCount = PolicyMetrics.countActivePolicies()
    _inForcePoliciesCount = PolicyMetrics.countInForcePolicies()
    var totalInForcePremiumResult = PolicyMetrics.sumInForcePremium(Currency)
    _totalInForcePremium = totalInForcePremiumResult.CalculatedAmount
    _totalInForcePremiumConverted = totalInForcePremiumResult.IsConverted

    var lifetimePremiumResult = PolicyMetrics.calculateLifetimePremium(Currency)
    _totalLifetimePremium = lifetimePremiumResult.CalculatedAmount
    _lifetimePremiumConverted = lifetimePremiumResult.IsConverted

    var openJobResults = PolicyMetrics.openJobResults()

    /* open Cancellations... */
    openJobResults.clearFilters()
    openJobResults.addFilter(new TypeFilter<Cancellation>() {
    })
    _openCancellationsCount = openJobResults.Count

    /* all open Jobs... */
    openJobResults.clearFilters()
    _jobs = openJobResults.toList()

    /* Cancellations in fixed time period window counts... */
    var filterCancellations = CancellationsFilter
    var cancellations = PolicyMetrics.cancellationsResult()
    _cancellationsByCustomerCount = filterCancellations.countCancellationsBy(cancellations, CancellationsByCustomerFilter)
    _cancellationsForNonPaymentCount = filterCancellations.countCancellationsBy(cancellations, CancellationsForNonPaymentFilter)
    _otherCancellationsCount = filterCancellations.countCancellationsBy(cancellations, OtherCancellationsFilter)
  }

  /**
   * Add an alert to the list of alerts.
   */
  private function addAlert(alertText: String) {
    _alerts.add(alertText)
  }

  protected function createPolicyAlerts() {
    if (_openCancellationsCount > 0) {
      addAlert(DisplayKey.get("Web.ContactFile.AccountHolder.Alerts.CancellationsInProgress"))
    }
  }

  protected function createClaimAlerts() {
    if (_shouldCreateClaimAlert) {
      addAlert(DisplayKey.get("Web.ContactFile.AccountHolder.Alerts.OpenClaims"))
    }
  }

  protected function createAlerts() {
    createPolicyAlerts()
    createClaimAlerts()
  }

  override property get RecentDelinquencies(): Optional<Integer> {
    if (!_recentDelinquenciesAvailable) {
      return Optional.empty()
    }
    return Optional.of(_recentDelinquencies)
  }
}
