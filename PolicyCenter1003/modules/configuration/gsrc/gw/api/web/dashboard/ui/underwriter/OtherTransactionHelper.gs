package gw.api.web.dashboard.ui.underwriter

uses gw.api.database.IQueryBeanResult
uses gw.api.database.QuerySelectColumns

@Export
class OtherTransactionHelper {
  final var _user: User

  construct(user: User) {
    _user = user
  }

  property get OtherTransactions(): IQueryBeanResult<Job> {
    var other = Job.finder.findDesktopOtherWorkOrdersJobsByUser(_user)
    other.orderBy(QuerySelectColumns.path({Job.SELECTEDVERSION_PROP.get(), PolicyPeriod.PERIODSTART_PROP.get()}))
    return other
  }

  function getPolicyNumber(job: Job): String {
    return job.SelectedVersion.PolicyNumber ?: ""
  }
}