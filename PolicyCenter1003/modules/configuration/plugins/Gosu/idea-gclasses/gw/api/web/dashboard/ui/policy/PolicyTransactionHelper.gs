package gw.api.web.dashboard.ui.policy

uses entity.Contact
uses entity.Job
uses gw.api.database.IQueryBeanResult
uses gw.api.locale.DisplayKey
uses pcf.AccountFile_WorkOrders
uses pcf.ContactFile_WorkOrders
uses pcf.NewSubmission
uses typekey.AccountContactRole

@Export
class PolicyTransactionHelper {
  var _jobs: Job[] as readonly Jobs
  var _viewMore()
  var _accounts: Account[] as readonly Accounts

  static function forAccount(account: Account): PolicyTransactionHelper {
    return new PolicyTransactionHelper({account}, \-> AccountFile_WorkOrders.push(account))
  }

  static function forContact(contact: Contact): PolicyTransactionHelper {
    return new PolicyTransactionHelper(contact.getAccountsByRoleType(AccountContactRole.TC_ACCOUNTHOLDER),
        \-> ContactFile_WorkOrders.push(contact))
  }

  construct(accounts: Account[], viewMore()) {
    _jobs = retrievePolicyTransactions(accounts, false)
    _accounts = accounts
    _viewMore = viewMore
  }

  static function retrievePolicyTransactions(accounts: Account[], completed: Boolean): Job[] {
    return accounts
        .flatMap(\acct -> acct.getAllJobs(completed, null, null, User.util.CurrentUser).toTypedArray())
        .orderByDescending<Date>(\job -> job.SelectedVersion.EditEffectiveDate)
        .thenBy(\j -> j, ComparatorMoveCancellationsToTopAndRenewalsToBottom)
        .toTypedArray()
  }

  function getPolicyNumber(job: Job): String {
    return job.SelectedVersion.PolicyNumber ?: ""
  }

  static private final var priorityBySubtype = {
      typekey.Job.TC_CANCELLATION->-1,
      typekey.Job.TC_RENEWAL->1
  };

  static property get ComparatorMoveCancellationsToTopAndRenewalsToBottom() : Comparator<Job> {
    return Comparator.comparingInt(\job : Job -> priorityBySubtype.getOrDefault(job.Subtype, 0))
  }

  function viewMore() {
    _viewMore()
  }

  function isNewSubmissionAvailable(account: Account): boolean {
    return !account.Locked and account.AccountStatus != AccountStatus.TC_WITHDRAWN
  }

  function newSubmission(account: Account) {
    NewSubmission.go(account)
  }

  function actionLabel(account: Account): String {
    return Accounts.length == 1 ?
        DisplayKey.get('Web.Dashboard.Tile.OpenPolicyTransactions.NewSubmission')
        : account.AccountHolderContactNameAndNick
  }
}
