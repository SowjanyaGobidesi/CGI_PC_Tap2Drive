package gw.api.web.dashboard.data.billing

/**
 * An abstraction for obtaining Billing data for the purposes of Billing/Payment Dashboard Tiles
 */
@Export
interface BillingService {
  /**
   * @return accumulated billing amounts for given {@code accountNumbers}, converted to given {@code currency}
   */
  function getBillingSummary(currency: Currency, accountNumbers: String[]): BillingSummaryDTO

  /**
   * @return accumulated billing amounts for given {@code policyPeriod}
   */
  function getPolicyBillingSummary(policyPeriod: PolicyPeriod): BillingSummaryDTO
}