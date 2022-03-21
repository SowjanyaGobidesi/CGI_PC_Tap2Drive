package gw.api.web.dashboard.ui.account

uses gw.account.SharedContactAccountSearchCriteria
uses gw.api.web.dashboard.ui.DashboardParameters

@Export
class RelatedAccountHelper {

  final var _account: Account
  final var _accountsLimit: int
  final var _relatedAcccounts: Account[]

  construct(account: Account) {
    this(account, DashboardParameters.ListViewLimitShort)
  }

  construct(account: Account, accountsLimit: int) {
    _accountsLimit = accountsLimit
    _account = account

    _relatedAcccounts = fetchRelatedAccounts(_account)
        .sortBy(\ra -> ra.AccountHolderContact.DisplayName)
  }

  private function fetchRelatedAccounts(account: Account): Account[] {
    var manuallySpecifiedRelatedAccounts = account.getAllRelatedAccounts(User.util.CurrentUser)
        .map(\relatedAccounts -> relatedAccounts.getRelationship(account))
        .map(\relationship -> relationship.OtherAccount)

    if (manuallySpecifiedRelatedAccounts.HasElements) {
      return manuallySpecifiedRelatedAccounts
    }

    var relatedAccountsSearchCriteria = new SharedContactAccountSearchCriteria() {
      :Secure = true,
      :AccountNumber = account.AccountNumber
    }
    return relatedAccountsSearchCriteria.performSearch()
        .map(\accountSummary -> accountSummary.Account)
        .toTypedArray()
  }

  property get RelatedAccounts(): Account[] {
    return _relatedAcccounts.limit(_accountsLimit)
  }

  property get ViewMoreVisible(): boolean {
    return _relatedAcccounts.length > _accountsLimit
  }
}