package gw.api.web.dashboard.ui.policy

uses entity.Job
uses gw.api.web.dashboard.ui.DashboardParameters

@Export
class PendingTransactionsHelper {

  final var _policyPeriod: PolicyPeriod
  final var _limit: int

  construct(policyPeriod: PolicyPeriod) {
    this(policyPeriod, DashboardParameters.ListViewLimit)
  }

  construct(policyPeriod: PolicyPeriod, limit: int) {
    _policyPeriod = policyPeriod
    _limit = limit
  }

  property get LatestPendingPolicyTransactions(): Job[] {
    return PendingPolicyTransactions
        .sortByDescending(\job -> job.LatestPeriod.EditEffectiveDate)
        .limit(_limit)
  }

  static function pendingPolicyTransactions(policyPeriod: PolicyPeriod): Job[] {
    return policyPeriod.Policy.OpenJobs.where(\job -> job.SelectedVersion.Status != PolicyPeriodStatus.TC_BOUND)
  }

  property get ViewMoreVisible(): boolean {
    return PendingPolicyTransactions.length > _limit
  }

  private property get PendingPolicyTransactions(): Job[] {
    return pendingPolicyTransactions(_policyPeriod)
  }
}
