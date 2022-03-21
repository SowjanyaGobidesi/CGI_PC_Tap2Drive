package gw.web.contact.impl

uses entity.Contact

@Export
class PolicyMetricsCollectorFactory {
  static function forContact(contact: Contact, roles: Set<Type<AccountContactRole>>): PolicyContactMetricsCollector {
    return new PolicyContactMetricsCollector(contact, roles)
  }

  static function forAccount(account: Account): PolicyAccountMetricsCollector {
    return new PolicyAccountMetricsCollector(account)
  }
}