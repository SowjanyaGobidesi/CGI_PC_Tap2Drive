package gw.web.contact

uses gw.web.contact.impl.AccountMetricsImpl
uses gw.web.contact.impl.ContactMetricsImpl
uses entity.Contact

/**
 * Implements a Metrics Factory.
 */
@Export
class MetricsFactory {

  static var _factory: MetricsFactory as Factory = new MetricsFactory()

  /**
   * Returns the metrics for the specified Contact with the specified Account Contact Roles.
   */
  function getContactMetrics(contact: Contact, roles: Set<Type<AccountContactRole>>) : ContactMetrics {
    var contactMetrics = new ContactMetricsImpl(contact, roles)
    contactMetrics.initialize()
    return contactMetrics
  }

  /**
   * Returns the metrics for the specified Account.
   */
  function getAccountMetrics(account: Account): AccountMetrics {
    var accountMetrics = new AccountMetricsImpl(account)
    accountMetrics.initialize()
    return accountMetrics
  }
}
