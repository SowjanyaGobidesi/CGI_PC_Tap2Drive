package gw.web.contact.impl

uses gw.plugin.billing.BCAccountBillingDisplayTotals
uses gw.web.contact.AccountMetrics
uses typekey.Currency

/**
 * Collects the Metrics for the Account.
 */
@Export
class AccountMetricsImpl extends CommonMetricsImpl implements AccountMetrics {
  final var _account: Account as readonly Account
  final var _policyMetrics: PolicyMetricsCollectorBase as readonly PolicyMetrics
  final var _billingMetrics = BillingMetricsCollector.Instance

  var _accountServiceTiers: List<CustomerServiceTier> as readonly AccountServiceTiers
  var _accountServiceTier: Optional<CustomerServiceTier> as readonly AccountServiceTier

  override property get BillingTotals(): BCAccountBillingDisplayTotals {
    return _billingMetrics.findBillingInfosForAccount(_account.AccountNumber, Currency)
  }

  override property get Currency(): Currency {
    return _account.PreferredSettlementCurrency
  }

  override function initialize() {
    super.initialize()
    _accountServiceTiers = _account.ServiceTier != null ? {_account.ServiceTier} : {}
    _accountServiceTier = Optional.ofNullable(_account.ServiceTier)
  }

  construct(account: Account) {
    _account = account
    _policyMetrics = PolicyMetricsCollectorFactory.forAccount(_account)
  }
}
