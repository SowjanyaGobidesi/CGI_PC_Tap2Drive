package gw.web.contact.impl

uses entity.Job
uses gw.api.database.DBFunction
uses gw.api.database.IQueryBeanResult
uses gw.api.database.ISelectQueryBuilder
uses gw.api.database.Query
uses gw.api.database.QueryRestrictor
uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.api.policy.period.PolicyPeriodQueryFilters
uses gw.api.util.MultiCurrencySummation
uses gw.api.web.policy.ViewablePolicyPeriodQueryFilter
uses gw.job.RewriteNewAccountQueryFilters
uses gw.pl.currency.MonetaryAmount
uses gw.util.Pair
uses typekey.Currency

uses java.math.BigDecimal

/**
 * Implements the helper that provides access to various policy metrics.
 */
@Export
abstract class PolicyMetricsCollectorBase {

  public static final var CANCELLATION_MONTHS_SINCE : int = 12

  // query path constants
  static final var PRIOR_PREMIUMS_CURRENCY = "PriorPremiumsCurrency"
  static final var PRIOR_PREMIUMS_SUM = "PriorPremiumsSum"
  static final var TOTAL_PREMIUM_RPT_CURRENCY = "TotalPremiumRPTCurrency"
  static final var TOTAL_PREMIUM_RPT_SUM = "TotalPremiumRPTSum"

  abstract function countAccounts(): int

  abstract function restrictAccounts(accountQuery: ISelectQueryBuilder)

  function policiesQuery(): Query<Policy> {
    var queryPolicies = Query.make(Policy)

    var accountTable = queryPolicies.join("Account")
    AccountQueryHelper.restrictByUserSecurity(accountTable)
    restrictAccounts(accountTable)

    return queryPolicies
  }

  function activePoliciesQuery(): Query<Policy> {
    var queryPolicies = policiesQuery()

    /* EXISTS on PolicyPeriods that are visible */
    var queryPeriods = Query.make(PolicyPeriod)

    //qryPeriods.compare("ModelNumber", NotEquals, null) // bound periods...
    new ViewablePolicyPeriodQueryFilter().filterNewQuery(queryPeriods)

    var today = Date.Today
    queryPeriods.or(\ rt ->
        rt.and(\ innerRestriction -> {
          innerRestriction.compare("CancellationDate", Equals, null).compare("PeriodEnd", GreaterThanOrEquals, today)
        })
            .and(\ innerRestriction -> {
              innerRestriction.compare("CancellationDate", NotEquals, queryPeriods.getColumnRef("PeriodStart"))
                  .compare("CancellationDate", GreaterThanOrEquals, today)
            })
    )

    PolicyPeriodQueryFilters.inForce(queryPeriods)
    RewriteNewAccountQueryFilters.createSubselectForNextTermsAreCanceled(queryPeriods)

    queryPolicies.subselect("ID", CompareIn, queryPeriods, "Policy")

    return queryPolicies
  }

  function activePolicyPeriodsQuery(): Query<PolicyPeriod> {
    var queryPeriods = Query.make(PolicyPeriod)
    var policies = queryPeriods.join("Policy")
    var accounts = policies.join("Account")
    restrictAccounts(accounts)

    new ViewablePolicyPeriodQueryFilter().filterNewQuery(queryPeriods)

    queryPeriods.or(\ rt ->
        rt.compare(PolicyPeriod#CancellationDate, Equals, null)
            .compare(PolicyPeriod#CancellationDate, NotEquals,
                queryPeriods.getColumnRef("PeriodStart")))

    PolicyPeriodQueryFilters.inForce(queryPeriods)

    return queryPeriods
  }

  /**
   * @return The first policy effective date for the specified account {@code contact} and types of {@code roles}
   */
  function firstEffectivePolicyDate() : Date {
    return policiesQuery().select({QuerySelectColumns.dbFunction(DBFunction.Min(Paths.make(Policy#OriginalEffectiveDate)))}).transformQueryRow(\row -> row.getColumn(0) as Date).single()
  }

  /**
   * @return The count of active (in-force and scheduled) policies for the specified account {@code contact} and types of {@code roles}
   */
  function countActivePolicies() : int {
    return activePoliciesQuery().select().Count
  }

  /**
   * @return The count of in-force policies for accounts of specific {@code contact} and types of {@code roles}
   */
  function countInForcePolicies(): int {
    var activePolicies = activePoliciesQuery().select()
    return activePolicies.map(\policy -> policy.findLastCoveredPeriod())
        .where(\period -> period != null and
            period.getCoverageEndDate() >= Date.CurrentDate and
            period.getPeriodStart() <= Date.CurrentDate).Count
  }

  /**
   * Returns the summation (total) of the in-force policy premiums.
   *
   * @param currency The currency for the calculations.
   * @return The sum of the Total Premium RPT of the most recently bound periods of all visible policies.
   */
  function sumInForcePremium(currency : Currency) : MonetaryAmountCalculationResult {
    var activePolicies = activePoliciesQuery().select()
    var amounts = activePolicies.map( \ policy -> {
      var period = policy.findLastCoveredPeriod()
      if ((period != null) and (period.getCoverageEndDate() >= Date.CurrentDate)) {
        return period.TotalPremiumRPT
      }
      return 0bd.ofCurrency(currency)
    })
    var summedAmounts = amounts.sumDifferentCurriences(currency)
    return new MonetaryAmountCalculationResult(summedAmounts, containsDifferentCurrency(currency, amounts))
  }

  /**
   * Returns a query result of the open jobs.
   *
   * @return A query result of the open jobs.
   */
  function openJobResults(): IQueryBeanResult<Job> {
    var restrictor : QueryRestrictor =  null
    var user = User.util.CurrentUser
    var queryJob = Query.make(Job)

    restrictor = Job.restrictors.open() // open jobs...
    if ( user != null ) {
      // restrict by permissions for user...
      restrictor = restrictor.with(Job.restrictors.satisfiesSecurityForUser(user))
    }
    restrictor.restrictOn(queryJob)

    queryJob.subselect("Policy", CompareIn, policiesQuery(), "ID")

    return queryJob.select()
  }

  /**
   * @return The query for the cancellations.
   */
  function cancellationsResult(): IQueryBeanResult<Cancellation> {
    var queryPolicies = policiesQuery()

    var queryJobs = Query.make(Cancellation)
    queryJobs.subselect("Policy", CompareIn, queryPolicies, "ID")

    /* include _all_ Cancellations within the last x months... */
    queryJobs.compare("CreateTime", GreaterThan, Date.Today.addMonths(-CANCELLATION_MONTHS_SINCE))

    var user = User.util.CurrentUser
    if ( user != null ) {
      // restrict by permissions for user...
      Job.restrictors.satisfiesSecurityForUser(user).restrictOn(queryJobs)
    }

    return queryJobs.select()
  }

  /**
   * @param currency The currency for claculations.
   * @return The sum of the Total Premium RPT of all latest (in model time) bound periods of all visible policies.
   */
  function calculateLifetimePremium(currency : Currency) : MonetaryAmountCalculationResult {
    // calculate sum of prior premiums (aggregate) by currency
    // (for the specified contact and role) and reduce to map
    // of sums of prior premiums by currency)
    var sumsOfPriorPremiums : Map<Currency, BigDecimal> = {}
    activePoliciesQuery().select({
        QuerySelectColumns.pathWithAlias(PRIOR_PREMIUMS_CURRENCY, Paths.make(Policy#PriorPremiums_cur)),
        QuerySelectColumns.dbFunctionWithAlias(PRIOR_PREMIUMS_SUM, DBFunction.Sum(Paths.make(Policy#PriorPremiums_amt)))
    }).transformQueryRow(\ p -> {
      return new Pair<Currency, BigDecimal>(p.getColumn(PRIOR_PREMIUMS_CURRENCY) as Currency, p.getColumn(PRIOR_PREMIUMS_SUM) as BigDecimal)
    }).reduce<Map<Currency, BigDecimal>>(sumsOfPriorPremiums, \v, h -> {
      v.put(h.First, h.Second)
      return v
    })
    var sumHolder = new MultiCurrencySummation(sumsOfPriorPremiums)

    // calculate sum of total premium RPT (aggregate) by currency
    // (for the specified contact and role) and reduce to map
    // of sums of total premium RPT by currency)
    var sumsOfTotalPremiumRPT : Map<Currency, BigDecimal> = {}
    activePolicyPeriodsQuery().select({
        QuerySelectColumns.pathWithAlias(TOTAL_PREMIUM_RPT_CURRENCY, Paths.make(PolicyPeriod#TotalPremiumRPT_cur)),
        QuerySelectColumns.dbFunctionWithAlias(TOTAL_PREMIUM_RPT_SUM, DBFunction.Sum(Paths.make(PolicyPeriod#TotalPremiumRPT_amt)))
    }).transformQueryRow(\ period ->
        new Pair<Currency, BigDecimal>(period.getColumn(TOTAL_PREMIUM_RPT_CURRENCY) as Currency, period.getColumn(TOTAL_PREMIUM_RPT_SUM) as BigDecimal))
        .reduce<Map<Currency, BigDecimal>>(sumsOfTotalPremiumRPT, \ v, h -> {
        v.put(h.First, h.Second)
        return v
      })

    sumHolder.add(sumsOfTotalPremiumRPT)
    var usesConvertedAmounts = containsDifferentCurrency(currency, sumsOfPriorPremiums)
                                or containsDifferentCurrency(currency, sumsOfTotalPremiumRPT)
    return new MonetaryAmountCalculationResult(sumHolder.sum(currency), usesConvertedAmounts)
  }

  protected function containsDifferentCurrency(currency : Currency, sums : Map<Currency, BigDecimal>) : boolean {
    return sums.Keys.hasMatch( \ cur -> cur != null and cur != currency)
  }

  protected function containsDifferentCurrency(currency : Currency, sums : List<MonetaryAmount>) : boolean {
    return sums.hasMatch( \ sum -> sum.Currency != null and sum.Currency != currency)
  }

  public static class MonetaryAmountCalculationResult {
    var _amount : MonetaryAmount as readonly CalculatedAmount
    var _converted : boolean as readonly IsConverted

    private construct(amount : MonetaryAmount, converted : boolean) {
      _amount = amount
      _converted = converted
    }
  }
}