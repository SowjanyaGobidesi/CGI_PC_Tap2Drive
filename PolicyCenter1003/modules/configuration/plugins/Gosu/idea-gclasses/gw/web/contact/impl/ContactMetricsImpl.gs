package gw.web.contact.impl

uses gw.api.database.QuerySelectColumns
uses gw.api.path.Paths
uses gw.plugin.billing.BCAccountBillingDisplayTotals
uses gw.web.contact.ContactMetrics
uses typekey.Currency
uses entity.Contact

/**
 * Collects the Metrics for the Contact.
 */
@Export
class ContactMetricsImpl extends CommonMetricsImpl implements ContactMetrics {
  var _contact: Contact as readonly Contact
  var _roles: Set<Type<AccountContactRole>>as readonly Roles
  final var _policyMetrics: PolicyContactMetricsCollector as readonly PolicyMetrics
  final var _billingMetrics = BillingMetricsCollector.Instance

  var _accountServiceTiers: List<CustomerServiceTier> as readonly AccountServiceTiers
  var _accountServiceTier: Optional<CustomerServiceTier> as readonly AccountServiceTier

  override property get AccountsCount(): int {
    return AccountQueryHelper.createQueryForContactAndRolesByUserSecurity(_contact, _roles).select().Count
  }

  override property get BillingTotals(): BCAccountBillingDisplayTotals {
    var accountNumbers = AccountQueryHelper.createQueryForContactAndRolesByUserSecurity(_contact, _roles)
        .select({QuerySelectColumns.path(Paths.make(Account#AccountNumber))}).transformQueryRow(\row -> row.getColumn(0) as String)
        .toSet()

    return _billingMetrics.findBillingInfosForAccounts(accountNumbers, Currency)
  }

  override property get Currency(): Currency {
    return _contact.PreferredSettlementCurrency
  }

  override function initialize() {
    super.initialize()
    _accountServiceTiers = _policyMetrics.lookupAccountServiceTiersFor()
    _accountServiceTier = calculateServiceTier()
  }

  construct(contact: Contact, roles: Set<Type<AccountContactRole>>) {
    _contact = contact
    _roles = roles
    _policyMetrics = PolicyMetricsCollectorFactory.forContact(_contact, _roles)
  }

  private function calculateServiceTier(): Optional<CustomerServiceTier> {
    if (AccountQueryHelper.createQueryForContactAndRolesByUserSecurity(_contact, _roles)
        .compare(Account#ServiceTier, Equals, null).select().Empty &&
        AccountServiceTiers.Count == 1) {
      return Optional.of(AccountServiceTiers.single())
    }
    return Optional.empty()
  }
}
