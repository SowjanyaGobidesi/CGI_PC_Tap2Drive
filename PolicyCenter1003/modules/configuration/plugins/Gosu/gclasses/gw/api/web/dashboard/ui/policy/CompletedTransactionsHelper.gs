package gw.api.web.dashboard.ui.policy

uses gw.api.web.dashboard.ui.DashboardParameters
uses org.apache.commons.lang3.ObjectUtils
uses pcf.CompletedPolicyTransactionsPopup
uses pcf.PolicyFile_Jobs

@Export
class CompletedTransactionsHelper {
  final var _transactions: PolicyPeriod[] as LatestCompletedPolicyTransactions

  construct(policyPeriod: PolicyPeriod) {
    _transactions = latestCompletedPolicyTransactions(policyPeriod)
  }

  property get ViewMoreVisible(): boolean {
    return _transactions.length > DashboardParameters.ListViewLimit
  }

  function viewMore(policyPeriod: PolicyPeriod, asOfDate: Date): void {
    if (policyPeriod.Archived) {
      CompletedPolicyTransactionsPopup.push(LatestCompletedPolicyTransactions)
    } else {
      PolicyFile_Jobs.push(policyPeriod, asOfDate)
    }
  }

  private function latestCompletedPolicyTransactions(policyPeriod: PolicyPeriod): PolicyPeriod[] {
    var comparator = new Comparator<PolicyPeriod>() {
      function compare(periodOne: PolicyPeriod, periodTwo: PolicyPeriod): int {
        var result = ObjectUtils.compare(periodTwo.TermNumber, periodOne.TermNumber)
        if (result == 0) {
          result = ObjectUtils.compare(periodTwo.ModelNumber, periodOne.ModelNumber)
        }
        return result
      }
    }
    return policyPeriod.Policy.CompletedPeriodsWithCost.sort(comparator)
  }
}
