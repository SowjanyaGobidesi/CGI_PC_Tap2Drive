package gw.account

uses java.lang.UnsupportedOperationException

/**
 * The reasons one might search for account, and configuration about what to do in those various cases.
 */
@Export
enum AccountSearchReason {
  /**
   * Normal searching of accounts.
   */
  SearchAccounts("Web.AccountFile.SearchAccount.AccountSearchInstructions", "Web.AccountFile.SearchAccount.RequireDifferentAccountNumber", /*normal searching should never end up in the OtherAccountSearch page*/null ),

  /**
   * Find an account to merge into the current account.
   */
  MergeAccounts("Web.AccountFile.MergeAccounts.AccountSearchInstructions", "Web.AccountFile.MergeAccounts.RequireDifferentAccountNumber", pcf.AccountFile_MergeAccountsSelection#go(entity.Account, entity.Account)),

  /**
   * Move policies from an account into the current one.
   */
  MovePolicies("Web.AccountFile.MovePolicies.AccountSearchInstructions", "Web.AccountFile.MovePolicies.RequireDifferentAccountNumber", pcf.AccountFile_MovePoliciesSelection#go(entity.Account, entity.Account)),

  /**
   * Rewrite policies from an account into the current one.
   */
  RewritePolicies("Web.AccountFile.RewritePolicies.AccountSearchInstructions", "Web.AccountFile.RewritePolicies.RequireDifferentAccountNumber", pcf.AccountFile_RewritePoliciesSelection#go(entity.Account, entity.Account))

  /**
   * DisplayKey for the title of the AccountFile's account search page.
   */
  var _titleDisplayKey : String as readonly TitleDisplayKey

  /**
   * DisplayKey for the error when the account number collides with the ExcludeAccount.
   */
  var _requireDifferentAccountNumberErrorDisplayKey : String as readonly RequireDifferentAccountNumberErrorDisplayKey

  /**
   * The action to take when select is clicked for a result in the OtherAccountSearch.
   */
  var _otherAccountSearchResultAction : gw.lang.reflect.features.MethodReference<pcf.api.Location, block(entity.Account, entity.Account)>

  private construct(titleDisplayKey : String, requireDifferentAccountNumberErrorDisplayKey : String, otherAccountSearchResultAction : gw.lang.reflect.features.MethodReference<pcf.api.Location, block(entity.Account, entity.Account)>) {
    _titleDisplayKey = titleDisplayKey
    _requireDifferentAccountNumberErrorDisplayKey = requireDifferentAccountNumberErrorDisplayKey
    _otherAccountSearchResultAction = otherAccountSearchResultAction
  }

  /**
   * Invoke the action to handle selecting the searchResultAccount, given this particular AccountSearchReason and
   * currentAccount. For example, if the reason is MovePolicies with the searchResultAccount being "Joe's Diner"
   * and the currentAccount "Mary's Pies", then the action will take you to the page to move policies from the
   * "Joe's Diner" account to "Mary's Pies".
   * @param searchResultAccount the result of the account search that is being selected
   * @param currentAccount the current account that we're operating on
   */
  function invokeOtherAccountSearchResultAction(searchResultAccount: Account, currentAccount: Account) {
    if (_otherAccountSearchResultAction == null) {
      throw new UnsupportedOperationException(this + " does not support going to the OtherAccountSearchResultAction")
    }
    _otherAccountSearchResultAction.invoke(searchResultAccount, currentAccount)
  }

}