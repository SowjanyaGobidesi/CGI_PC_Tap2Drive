package gw.web.contact.impl

uses gw.api.database.ISelectQueryBuilder
uses gw.api.database.Query
uses gw.api.database.QueryRestrictor
uses gw.entity.IEntityType

@Export
class AccountQueryHelper {
  /**
   * Restricts Account query by user security.
   *
   * @param accountQuery Account query to restrict.
   */
  static function restrictByUserSecurity(accountQuery: ISelectQueryBuilder) {
    // restrict by permissions for user...
    var restrictor : QueryRestrictor = Account.restrictors.satisfiesSecurityForUser(User.util.CurrentUser)
    restrictor.restrictOn(accountQuery)
  }

  /**
   * Restricts Account query by contact and roles.
   *
   * @param accountQuery Account query to restrict.
   * @param contact Contact for which the query should be restricted.
   * @param roles Account Contact Roles for which the query should be restricted.
   */
  static function restrictForContactAndRoles(accountQuery: ISelectQueryBuilder, contact: Contact,
                                             roles: Set<Type<AccountContactRole>>) {
    if ((roles.Count == 1) and (roles.single() == AccountHolder)) {
      /* use de-normalized AccountHolderContact... */
      accountQuery.compare("AccountHolderContact", Equals, contact)
    } else {
      /* EXISTS on Account.AccountContacts correlated by Account for contact... */
      var accountContact = accountQuery.subselect("ID", CompareIn, AccountContact, "Account")
      accountContact.compare("Contact", Equals, contact)
      /* EXISTS on AccountContact.Roles
       *  correlated by AccountContact for Role type...
       */
      var accountContactRoleTable = accountContact.join(AccountContactRole, "AccountContact")
      accountContactRoleTable.compareIn("Subtype", roles.map(\r -> (r as IEntityType).SubtypeTypeKey)?.toTypedArray())
    }
  }

  /**
   * Restricts Account query by one account.
   *
   * @param accountQuery Account query to restrict.
   * @param account Account for which the query should be restricted.
   */
  static function restrictForAccount(accountQuery: ISelectQueryBuilder, account: Account) {
    accountQuery.compare(Account#PublicID, Equals, account.PublicID)
  }

  /**
   * Return a query for the Accounts associated with the specified contact by the specified role.
   *
   * @param contact The contact to whom which all returned accounts link
   * @param roles The roles by which the contact links to the returned accounts
   *
   * @return A query for the accounts where the specified role is held by the contact.
   */
  static function createQueryForContactAndRolesByUserSecurity(contact: Contact, roles: Set<Type<AccountContactRole>>): Query<Account> {
    var accountQuery = Query.make(Account)

    restrictByUserSecurity(accountQuery)
    restrictForContactAndRoles(accountQuery, contact, roles)
    return accountQuery
  }

  /**
   * @param accountNumber
   * @return Account for the account number or null if it doesn't exist
   */
  static function findAccount(accountNumber: String): Account {
    var accountQuery = Query.make(Account)
    accountQuery.compare(Account#AccountNumber, Equals, accountNumber)
    return accountQuery.select().AtMostOneRow
  }
}
