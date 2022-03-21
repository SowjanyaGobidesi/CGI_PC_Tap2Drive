package gw.api.web.dashboard.ui.account

uses entity.Contact
uses gw.api.web.dashboard.ui.DashboardParameters

@Export
class ContactAccountListHelper {

  final var _accounts: Account[] as Accounts

  construct(contact: Contact) {
    _accounts = contact.getAccountsByRoleType(typekey.AccountContactRole.TC_ACCOUNTHOLDER)
        .where(\account -> perm.Account.view(account))
  }

  function isAccountAvailable(i: int): boolean {
    return i < Accounts.length
  }

  property get ViewMoreVisible(): boolean {
    return _accounts.length > DashboardParameters.ListViewLimitShort
  }

}