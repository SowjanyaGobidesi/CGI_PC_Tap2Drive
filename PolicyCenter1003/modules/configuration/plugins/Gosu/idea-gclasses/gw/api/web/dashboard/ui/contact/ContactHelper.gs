package gw.api.web.dashboard.ui.contact

uses gw.api.web.dashboard.ui.DashboardParameters
uses gw.web.account.AccountFileContactsUIHelper
uses pcf.ContactForward

@Export
class ContactHelper {
  final static var _accountContactComparator = (\-> {
    var orderMap: Map<typekey.AccountContactRole, Integer> = {
        typekey.AccountContactRole.TC_ACCOUNTHOLDER->1,
        typekey.AccountContactRole.TC_NAMEDINSURED->2
    }
    var byRole = Comparator.comparingInt<AccountContact>(\contact ->
        contact.Roles.HasElements ?
            contact.Roles.min(\role -> orderMap.getOrDefault(role.Subtype, Integer.MAX_VALUE)) :
            Integer.MAX_VALUE)
    var byName = Comparator.comparing<AccountContact, String>(\contact -> contact.DisplayName)
    return byRole.thenComparing(byName)
  })()

  static class AccountContactWithRole {
    final var _accountContact: AccountContact as readonly AccountContact
    final var _displayName: String as readonly DisplayName
    final var _roles: String as readonly Roles

    private construct(contact: AccountContact, displayName: String, roles: String) {
      _accountContact = contact
      _displayName = displayName
      _roles = roles
    }
  }

  final var _contacts: AccountContactWithRole[]
  final var _contactLimit: int

  private construct(contacts: AccountContactWithRole[], contactLimit: int) {
    _contacts = contacts
    _contactLimit = contactLimit
  }

  static function forAccount(account: Account, limit: int): ContactHelper {
    return new ContactHelper(initContacts(account), limit)
  }

  static function forAccount(account: Account): ContactHelper {
    return forAccount(account, DashboardParameters.ListViewLimitShort)
  }

  static function forPolicyPeriod(policyPeriod: PolicyPeriod, limit: int): ContactHelper {
    return new ContactHelper(initContacts(policyPeriod), limit)
  }

  static function forPolicyPeriod(policyPeriod: PolicyPeriod): ContactHelper {
    return forPolicyPeriod(policyPeriod, DashboardParameters.ListViewLimitShort)
  }

  private static function initContacts(account: Account): ContactHelper.AccountContactWithRole[] {
    var rolesDisplay = AccountFileContactsUIHelper.loadAcctContactRolesDisplay(account)
    return account.AccountContacts.sort(_accountContactComparator).map(\ac ->
        new ContactHelper.AccountContactWithRole(ac,
            ac.DisplayName,
            AccountFileContactsUIHelper.lookupAcctContactRolesDisplayName(rolesDisplay, ac))
    )
  }

  private static function initContacts(policyPeriod: PolicyPeriod): ContactHelper.AccountContactWithRole[] {
    if (policyPeriod.Archived) {
      return {}
    }

    var contacts = sortedContacts(policyPeriod)

    return contacts.map(\accountContact -> new ContactHelper.AccountContactWithRole(
        accountContact,
        formatContactName(policyPeriod, accountContact),
        formatAccountContactRoles(policyPeriod, accountContact)))
  }

  private static function sortedContacts(policyPeriod: PolicyPeriod): AccountContact[] {
    var orderRules = contactOrderRules(policyPeriod)
    var rolesComparator = Comparator.comparingInt(\accountContact: AccountContact ->
        orderRules.getOrDefault(accountContact.Contact, Integer.MAX_VALUE))
    var contacts = policyPeriod.AccountContactRoleMap.keySet().toTypedArray()
    contacts.sort(rolesComparator)

    return contacts
  }

  private static function contactOrderRules(policyPeriod: PolicyPeriod): Map<Contact, Integer> {
    return {
        policyPeriod.Policy.Account.AccountHolderContact ->1,
        policyPeriod.PrimaryNamedInsured.ContactDenorm->2,
        policyPeriod.SecondaryNamedInsured.ContactDenorm->3
    }
  }

  private static function formatContactName(policyPeriod: PolicyPeriod, accountContact: AccountContact): String {
    return policyPeriod.AccountContactRoleMap.get(accountContact).first().DisplayName
  }

  private static function formatAccountContactRoles(policyPeriod: PolicyPeriod, accountContact: AccountContact): String {
    var roleNames = new ArrayList<String>()
    if (accountContact.hasRole(TC_ACCOUNTHOLDER)) {
      roleNames.add(AccountHolder.DisplayName)
    }
    roleNames.addAll(policyPeriod.AccountContactRoleMap.get(accountContact)
        .map(\policyContactRole -> (typeof policyContactRole).TypeInfo.DisplayName))
    return roleNames.join(", ")
  }

  function goToContact(accountContactIndex: int) {
    ContactForward.go(_contacts[accountContactIndex].AccountContact.Contact)
  }

  function goToContact(contactWithRole: AccountContactWithRole) {
    ContactForward.go(contactWithRole.AccountContact.Contact)
  }

  function isContactPresent(accountContactIndex: int): boolean {
    return _contacts.length > accountContactIndex
  }

  property get Contacts(): AccountContactWithRole[] {
    return _contacts.limit(_contactLimit)
  }

  property get ViewMoreVisible(): boolean {
    return _contacts.length > _contactLimit
  }
}