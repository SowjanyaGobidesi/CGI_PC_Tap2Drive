package gw.web.contact

uses entity.Contact

/**
 * Collects the metrics for the Accounts associated with a Contact through a specific AccountContact Role.
 */
@Export
interface ContactMetrics extends CommonMetrics {
  /**
   * The Contact.
   */
  property get Contact() : Contact

  /**
   * The AccountContactRole type.
   */
  property get Roles() : Set<Type<AccountContactRole>>

  /**
   * The number of accounts associated with the Contact.
   */
  property get AccountsCount() : int
}
