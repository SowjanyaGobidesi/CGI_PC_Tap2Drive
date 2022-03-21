package gw.web.contact

uses gw.pl.currency.MonetaryAmount

/**
 * Collects the various metrics.
 */
@Export
interface CommonMetrics {
  /**
   * The 1st effective date for policies.
   */
  property get FirstEffectivePolicyDate() : Date

  /**
   * The number of active policies.
   */
  property get ActivePoliciesCount() : int

  /**
   * The number of in-force policies.
   */
  property get InForcePoliciesCount(): int

  /**
   * The total in-force policy premiums.
   */
  property get TotalInForcePremium() : MonetaryAmount

  /**
   * True if any amounts had to be converted from a different currency.
   */
  property get TotalInForcePremiumConverted() : boolean

  /**
   * The number of cancellations made by the customer.
   */
  property get CancellationsByCustomerCount() : int

  /**
   * The number of cancellations made by the carrier for non-payment.
   */
  property get CancellationsForNonPaymentCount() : int

  /**
   * The number of cancellations made by the carrier for other reasons.
   */
  property get OtherCancellationsCount() : int

  /**
   * The total lifetime premium for all policies.
   */
  property get TotalLifetimePremium() : MonetaryAmount

  /**
   * True if any amounts had to be converted from a different currency.
   */
  property get LifetimePremiumConverted() : boolean

  /**
   * The list of jobs.
   */
  property get Jobs() : List<Job>

  /**
   * Total number of open claims.
   */
  property get OpenClaimsCount() : int

  /**
   * The summation of TotalIncurred taken across all claims contained in ClaimSet.
   */
  property get NetTotalIncurred() : MonetaryAmount

  /**
   * The total unbilled amount.
   */
  property get TotalUnbilled() : MonetaryAmount

  /**
   * The total currently billed amount.
   */
  property get TotalCurrentlyBilled() : MonetaryAmount

  /**
   * The total past due amount.
   */
  property get TotalPastDueBilled() : MonetaryAmount

  /**
   * The total outstanding billed amount.
   */
  property get TotalOutstandingBilled() : MonetaryAmount

  /**
  * True if any amounts had to be converted from a different currency.
  */
  property get BillingAmountsConverted() : boolean

  /**
   * Is Direct Bill Only?
   */
  property get DirectBillOnly() : boolean

  /**
   * The Alert messages based on the metrics.
   */
  property get Alerts() : List<String>

  /**
   * The service tiers associated with metrics.
   */
  property get AccountServiceTiers() : List<CustomerServiceTier>

  /**
   * @return Account Service Tier, if applicable.
   */
  property get AccountServiceTier() : Optional<CustomerServiceTier>

  /**
   * Number of delinquency processes started recently.
   * The time period is configured in BC and by default it's last 12 months.
   * When the result cannot be obtained for even a single account, then Optional.empty is returned.
   */
  property get RecentDelinquencies(): Optional<Integer>
}
