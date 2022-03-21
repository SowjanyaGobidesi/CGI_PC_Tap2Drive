package gw.api.web.dashboard.data.currentpolicies

/**
 * An abstraction for obtaining the data for Current Policies Dashboard Tile
 */
@Export
interface CurrentPoliciesService {
  /**
   * @return {@link PolicyPeriod}s assigned to either of {@code accounts} where {@code PolicyPeriod#getPeriodStart() >= startedAfter}
   */
  function getAccountPolicyPeriods(accounts: Account[]): PolicyPeriod[]

  /**
   * @return {@link PolicyPeriod}s assigned to either of {@code accountHolderContact}'s held Accounts where {@code PolicyPeriod#getPeriodStart() >= startedAfter}
   */
  function getContactPolicyPeriodsStartedAfter(accountHolderContact: Contact, startedAfter: Date): PolicyPeriod[]
}