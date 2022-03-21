package gw.api.web.dashboard.ui.underwriter

uses gw.api.database.Query
uses gw.api.web.dashboard.ui.DashboardParameters
uses pcf.JobForward
uses pcf.PolicyFileForward

@Export
class ContingencyHelper {
  final var _contingencies: Contingency[] as readonly Contingencies

  construct(user: User, limit: int) {
    _contingencies = Query.make(Contingency)
        .join(Contingency#Policy)
        .join(Job#Policy)
        .join(JobUserRoleAssignment#Job)
        .compareIn(JobUserRoleAssignment#Role, {TC_UNDERWRITER})
        .compare(JobUserRoleAssignment#AssignedUser, Equals, user)
        .withDistinct(true)
        .select()
        .orderBy(Contingency.DUEDATE_PROP.get())
        .limit(limit)
        .toTypedArray()
  }

  construct(user: User) {
    this(user, DashboardParameters.ListViewLimit)
  }

  function goToRiskAnalysisPage(contingency: Contingency) {
    if (contingency.PolicyPeriod == null) {
      PolicyFileForward.go(contingency.Policy.LatestPeriod, contingency.Policy.LatestPeriod.PeriodStart, 'PolicyRiskAnalysis')
    } else {
      JobForward.go(contingency.PolicyPeriod.Job, contingency.PolicyPeriod, 'RiskAnalysis')
    }
  }
}