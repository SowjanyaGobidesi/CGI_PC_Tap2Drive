package gw.api.web.dashboard.ui.policy

uses entity.Contact
uses gw.account.ProductCodeFilterSet
uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.policy.period.PolicyPeriodQueryFilters
uses gw.api.web.ExternalSystemPages
uses gw.api.web.dashboard.data.currentpolicies.CurrentPoliciesService
uses gw.api.web.dashboard.data.impl.DashboardServices
uses gw.api.web.dashboard.ui.DashboardParameters
uses gw.api.web.dashboard.ui.billing.BillingSummaryHelper
uses gw.api.web.dashboard.ui.claims.ClaimHelper
uses gw.api.web.dashboard.ui.claims.LossRatioHelper
uses gw.api.web.policy.ViewablePolicyPeriodQueryFilter
uses gw.policy.PolicyFilters
uses gw.util.concurrent.LockingLazyVar
uses gw.web.policyfile.PolicyFileMenuActionsUIHelper
uses pcf.ContactFile_Policies
uses pcf.CreateClaim
uses pcf.PolicyFile_Jobs
uses pcf.Policy_CurrentPoliciesPopup
uses pcf.api.Location

@Export
class CurrentPolicyHelper {
  var _account: Account
  var _contact: Contact
  var _periods: PolicyPeriod[] as readonly PolicyPeriods
  var _periodsViewMore: LockingLazyVar<PolicyPeriod[]>
  var _policyBillingHelpers: Map<PolicyPeriod, BillingSummaryHelper>
  var _policyClaimHelpers: Map<PolicyPeriod, ClaimHelper>
  var _openTransactions: Map<PolicyPeriod, Job[]>
  var _viewMore()
  var _lossRatioHelper: LossRatioHelper as readonly LossRatioHelper

  static function forContact(contact: Contact): CurrentPolicyHelper {
    return new CurrentPolicyHelper(contact)
  }

  static function forAccount(account: Account): CurrentPolicyHelper {
    return new CurrentPolicyHelper(account, LossRatioHelper.forAccount(account))
  }

  static function forAccount(account: Account, lossRatioHelper: LossRatioHelper): CurrentPolicyHelper {
    return new CurrentPolicyHelper(account, lossRatioHelper)
  }

  private construct(contact: Contact) {
    this(queryPolicyPeriods(DashboardServices.Instance.CurrentPoliciesService, contact),
        \-> ContactFile_Policies.push(contact),
        null)
    _contact = contact
    _periodsViewMore = LockingLazyVar.make(\-> findLatestBoundPolicyPeriods().toTypedArray())
  }

  private construct(account: Account, lossRatioHelper: LossRatioHelper) {
    this(queryPolicyPeriods(DashboardServices.Instance.CurrentPoliciesService, account),
        \-> Policy_CurrentPoliciesPopup.push(account),
        lossRatioHelper)
    _account = account
  }

  private construct(periods: PolicyPeriod[], viewMore(), lossRatioHelper: LossRatioHelper) {
    _periods = periods
    _periodsViewMore = LockingLazyVar.make(\-> _periods)
    _policyBillingHelpers = _periods.mapToKeyAndValue(\period -> period, \period -> new BillingSummaryHelper(period))
    _policyClaimHelpers = _periods.mapToKeyAndValue(\period -> period, \period -> new ClaimHelper(period.Policy))
    _openTransactions = _periods.mapToKeyAndValue(\period -> period, \period -> PendingTransactionsHelper.pendingPolicyTransactions(period))
    _viewMore = viewMore
    _lossRatioHelper = lossRatioHelper
  }

  function getProductCodeFilterSet(): ProductCodeFilterSet {
    return _account != null
        ? new gw.account.ProductCodeFilterSet({_account})
        : new gw.account.ProductCodeFilterSet(_contact.AccountContacts.map(\ac -> ac.Account))
  }

  function findLatestBoundPolicyPeriods(): List<PolicyPeriod> {
    if (_account != null) {
      var query = Query.make(PolicyPeriod)

      // Filter for specified account
      var policyTable = query.join(PolicyPeriod#Policy)
      policyTable.compare(Policy#Account, Equals, _account.ID)
      // Filter for bound and In Force policy periods
      PolicyPeriodQueryFilters.boundInForce(query)
      // Filter for current user
      new ViewablePolicyPeriodQueryFilter().filterNewQuery(query)
      // No duplicates
      query.withDistinct(true)

      var results = query.select().toList()

      // First partition by Policy ( map[policy]->[period1,period2,...]
      var policyToPeriodListMap = results.partition(\p -> {
        return p.Policy
      })
      // For each policy, pick out the latest period
      return policyToPeriodListMap.Values.flatMap<PolicyPeriod>(\l -> {
        return {l.orderByDescending(\p -> p.PeriodStart).thenByDescending(\p -> p.ModelDate).first()}
      })
    }
    return _contact.AssociationFinder.findLatestBoundPolicyPeriods()
  }

  // TODO - achrabaszcz - fix it when splitting Policy_CurrentPoliciesScreen for Account and Contact pages
  property get PolicyPeriodsOnViewMore(): PolicyPeriod[] {
    return _periodsViewMore.get()
  }

  private static function filterPolicyPeriods(periods: PolicyPeriod[]): PolicyPeriod[] {
    var statusFilter = new PolicyFilters.InForceOrScheduledStatusFilter()
    return periods.where(\pd -> statusFilter.applyFilter(pd)).sortByDescending(\pd -> pd.PeriodStart)
  }

  private static function queryPolicyPeriods(service: CurrentPoliciesService, contact: Contact): PolicyPeriod[] {
    return filterPolicyPeriods(service.getContactPolicyPeriodsStartedAfter(contact, Date.Today.addYears(-1)))
  }

  static property get ComparatorMovingActiveOnTop(): Comparator<PolicyPeriod> {
    var inForceOrScheduledFilter = new PolicyFilters.InForceOrScheduledStatusFilter()
    return Comparator.comparingInt<PolicyPeriod>(\p -> inForceOrScheduledFilter.applyFilter(p) ? 1 : -1)
        .thenComparing(\p -> p.PeriodStart)
  }

  static property get ComparatorPeriodStartDescending(): Comparator<PolicyPeriod> {
    return \periodOne, periodTwo -> periodTwo.PeriodStart.compareTo(periodOne.PeriodStart)
  }

  private static function queryPolicyPeriods(service: CurrentPoliciesService, account: Account): PolicyPeriod[] {
    return service.getAccountPolicyPeriods({account}).sort(ComparatorPeriodStartDescending)
  }

  property get ViewMoreVisible(): boolean {
    return _periods.length > DashboardParameters.ListViewLimit
  }

  function viewMore() {
    _viewMore()
  }

  property get CanFileClaim(): boolean {
    return ExternalSystemPages.ClaimPageAvailable
  }

  function fileClaim(period: PolicyPeriod) {
    CreateClaim.push(gw.api.system.PCConfigParameters.ClaimSystemURL.Value, period.PolicyNumber)
  }

  function recalculateLossRatio() {
    if (_lossRatioHelper != null) {
      _lossRatioHelper.recalculateLossRatio()
    }
  }

  function startRenewal(period: PolicyPeriod, location: Location) {
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      PolicyFileMenuActionsUIHelper.startRenewal(bundle.add(period), location)
    })
  }

  function openTransactionsAction(period: PolicyPeriod): void {
    PolicyFile_Jobs.push(period, period.EditEffectiveDate,
        _openTransactions.get(period)?.sortByDescending(\p -> p.LatestPeriod.EditEffectiveDate).first())
  }

  function effectiveDates(policyPeriod: PolicyPeriod): String {
    var start = policyPeriod.PeriodStart
    var end = policyPeriod.PeriodEnd
    return DisplayKey.get('Web.Dashboard.Tile.CurrentPolicyTerms.DatesEffective.Format', start.ShortFormat, end.ShortFormat)
  }

  function numberOfOpenTransactions(policyPeriod: PolicyPeriod): int {
    return _openTransactions.get(policyPeriod).length
  }

  function isOpenTransactionsActionAvailable(policyPeriod: PolicyPeriod): boolean {
    return numberOfOpenTransactions(policyPeriod) > 0
  }

  function numberOfOpenBillings(policyPeriod: PolicyPeriod): int {
    return _policyBillingHelpers.get(policyPeriod)?.NumberOfOpenBillings
  }

  function isOpenBillingsActionAvailable(policyPeriod: PolicyPeriod): boolean {
    return numberOfOpenBillings(policyPeriod) > 0
  }

  function numberOfOpenClaims(policyPeriod: PolicyPeriod): int {
    return _policyClaimHelpers.get(policyPeriod)?.OpenClaims.length
  }

  function isOpenClaimsActionAvailable(policyPeriod: PolicyPeriod): boolean {
    return numberOfOpenClaims(policyPeriod) > 0
  }

  function claimsViewMore(policyPeriod: PolicyPeriod): void {
    _policyClaimHelpers.get(policyPeriod)?.viewMore()
  }
}