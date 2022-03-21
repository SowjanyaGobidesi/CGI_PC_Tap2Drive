package gw.web.contact.impl

uses gw.api.database.ISelectQueryBuilder

@Export
class PolicyAccountMetricsCollector extends PolicyMetricsCollectorBase {

  final var _account: Account

  construct(account: Account) {
    _account = account
  }

  /**
   * @return The count of accounts associated with the specified account (always one).
   */
  override function countAccounts(): int {
    /* Note: Do not use contact.AccountHolderCount, which is absolute
     * and does not take access security by the user into account...
     */
    return 1
  }

  /**
   * Restrict a query builder on an Account to the given account only.
   */
  override function restrictAccounts(accountQuery: ISelectQueryBuilder) {
    AccountQueryHelper.restrictForAccount(accountQuery, _account)
  }
}