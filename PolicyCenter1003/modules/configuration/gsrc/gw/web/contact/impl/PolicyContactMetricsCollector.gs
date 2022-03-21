package gw.web.contact.impl

uses gw.api.database.ISelectQueryBuilder
uses gw.api.database.Query
uses gw.api.database.Relop
uses entity.AccountContactRole
uses entity.Contact

/**
 * Implements the helper that provides access to various policy metrics associated with a specified contact
 * who has a role (e.g., account holder) in a set of specified roles.
 */
@Export
class PolicyContactMetricsCollector extends PolicyMetricsCollectorBase {

  final var _contact: Contact
  final var _roles: Set<Type<AccountContactRole>>

  construct(contact: Contact, roles: Set<Type<AccountContactRole>>) {
    _contact = contact
    _roles = roles
  }

  /**
   * Returns the count of accounts associated with the specified account contact and role type.
   *
   * @return The number of accounts where the specified role is held by the contact
   */
  override function countAccounts(): int {
    /* Note: Do not use contact.AccountHolderCount, which is absolute
     * and does not take access security by the user into account...
     */
    return AccountQueryHelper.createQueryForContactAndRolesByUserSecurity(_contact, _roles).select().Count
  }

  /**
   * Restrict a query builder on an Account to those associated with the specified contact by the specified role.
   */
  override function restrictAccounts(accountQuery: ISelectQueryBuilder) {
    AccountQueryHelper.restrictForContactAndRoles(accountQuery, _contact, _roles)
  }

  /**
   * Returns the {@link CustomerServiceTier}s for each account where the Contact fills one of the
   * specified roles.  The CustomerServiceTiers are returned in reverse Priority order (highest first).  Null
   * CustomerServiceTiers will be discarded and not returned.
   *
   * @return Service Tiers for associated Accounts in descending order
   */
  function lookupAccountServiceTiersFor(): List<CustomerServiceTier> {
    var accounts = Query.make(Account)
        .compare(Account#ServiceTier, Relop.NotEquals, null)
    restrictAccounts(accounts)
    AccountQueryHelper.restrictByUserSecurity(accounts)
    return accounts.select().map( \ account -> account.ServiceTier).toSet().orderByDescending( \ serviceTier -> serviceTier.Priority)
  }
}
