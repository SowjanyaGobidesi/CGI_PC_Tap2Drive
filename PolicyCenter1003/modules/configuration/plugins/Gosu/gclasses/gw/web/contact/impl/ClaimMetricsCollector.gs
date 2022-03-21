package gw.web.contact.impl

uses gw.api.system.PLDependenciesGateway
uses gw.api.util.DisplayableException
uses gw.api.util.LocationUtil
uses gw.api.util.MultiCurrencySummation
uses gw.api.web.dashboard.ui.DashboardParameters
uses gw.losshistory.ClaimSearchCriteria
uses gw.pl.currency.MonetaryAmount
uses gw.plugin.claimsearch.NoResultsClaimSearchException
uses typekey.Currency

/**
 * Implements the 7.0 accelerator version of a helper that provides access to
 * Claims for policies belonging to accounts associated with a specified contact
 * who is the account holder.
 */
@Export
class ClaimMetricsCollector {

  static final var _instance: ClaimMetricsCollector as readonly Instance = new ClaimMetricsCollector()

  private construct() {
  }

  /**
   * Retrieves recent claims from Claim System. The period for which claims are retrieved is configured by a constant.
   *
   * @param policyNumbers Policy numbers for which claims should be retrieved
   * @return Instance of ClaimSet with retrieved claims.
   */
  function findRecentClaims(policyNumbers: Set<String>): ClaimSet {
    var today = PLDependenciesGateway.SystemClock.DateTime
    return findClaimsWithinDateRange(policyNumbers, today.addYears(-DashboardParameters.LossRatioCalculationYears), today)
  }

  /**
   * Retrieves recent claims from Claim System within a given date range.
   *
   * @param policyNumbers Policy numbers for which claims should be retrieved
   * @param startDate Start date of the period for which the claims should be retrieved
   * @param endDate End date of the period for which the claims should be retrieved
   * @return Instance of ClaimSet with retrieved claims.
   */
  function findClaimsWithinDateRange(policyNumbers: Set<String>, startDate: Date, endDate: Date): ClaimSet {
    var claimSet = new ClaimSet()
    if (policyNumbers == null or policyNumbers.Empty) {
      return claimSet
    }

    var criteria = new ClaimSearchCriteria()
    criteria.PolicyNumbers = policyNumbers.toTypedArray()
    criteria.DateCriteria.StartDate = startDate
    criteria.DateCriteria.EndDate = endDate
    criteria.DateCriteria.DateSearchType = DateSearchType.TC_ENTEREDRANGE
    try {
      claimSet = criteria.performSearch()
    } catch (ignored: NoResultsClaimSearchException) {
      // No results, we can safely ignore
    } catch (e: DisplayableException) {
      LocationUtil.addRequestScopedErrorMessage(e.LocalizedMessage)
      return null
    }
    claimSet.Claims.where(\c -> c.Status != "Open").each(\c -> claimSet.removeFromClaims(c))
    return claimSet
  }

  /**
   * Calculates the total incurred value from given claims.
   *
   * @param currency Currency of the resulted monetary amount
   * @param openClaims Claims to calculate the result from
   * @return Total incurred value
   */
  function calculateTotalIncurred(currency: Currency, openClaims: Claim[]): MonetaryAmount {
    var totalIncurred = new MultiCurrencySummation()
    openClaims.each(\claim -> {
      if (claim.TotalIncurred != null) {
        totalIncurred.add(claim.TotalIncurred)
      }
    })
    return totalIncurred.sum(currency)
  }
}
