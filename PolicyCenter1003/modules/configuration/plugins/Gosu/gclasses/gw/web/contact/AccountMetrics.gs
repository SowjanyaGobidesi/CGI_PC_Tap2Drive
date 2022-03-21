package gw.web.contact

/**
 * Collects the metrics for the specified Account.
 */
@Export
interface AccountMetrics extends CommonMetrics {
  /**
   * The Account.
   */
  property get Account(): Account
}
