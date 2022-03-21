package gw.api.web.dashboard.ui.underwriter

uses gw.api.job.EffectiveDateCalculator
uses gw.api.locale.DisplayKey
uses gw.api.web.color.GWColor
uses gw.api.web.desktop.DesktopActivityFilters
uses gw.api.web.desktop.DesktopJobFilters

@Export
class MySummaryHelper {

  final var _activitiesCount: int as readonly ActivitiesCount
  final var _activitiesPastDueCount: int
  final var _submissionsCount: int as readonly SubmissionsCount
  final var _submissionsPastDueCount: int
  final var _changeRequestsCount: int as readonly ChangeRequestsCount
  final var _changeRequestsPastDueCount: int
  final var _renewalsCount: int as readonly RenewalsCount
  final var _renewalsPastDueCount: int
  final var _cancellationsCount: int as readonly CancellationsCount
  final var _cancellationsPastDueCount: int

  construct(user: User) {
    var effDateCalculator = EffectiveDateCalculator.instance()
    var activities = Activity.finder.getAssignedToUsers({user.ID})
    activities.addFilter(DesktopActivityFilters.allOpen())
    _activitiesCount = activities.Count
    _activitiesPastDueCount = activities.where(\activity -> activity.Overdue).Count

    var submissions = Job.finder.findSubmissionsAndIssuancesByUser(user)
    submissions.addFilter(DesktopJobFilters.myOpenActivitiesFilter())
    _submissionsCount = submissions.Count
    _submissionsPastDueCount = submissions.where(\submission -> submission.DateQuoteNeeded < Date.Today).Count

    var changeRequests = Job.finder.findJobsOfTypeByUser(typekey.Job.TC_POLICYCHANGE, user)
    changeRequests.addFilter(DesktopJobFilters.myOpenActivitiesFilter())
    _changeRequestsCount = changeRequests.Count
    _changeRequestsPastDueCount = changeRequests.where(\job -> job.LatestPeriod.EditEffectiveDate < effDateCalculator.getPolicyChangeEffectiveDate(Date.Today, job.LatestPeriod, job as PolicyChange)).Count

    var renewals = Job.finder.findRenewalsByUser(user)
    renewals.addFilter(DesktopJobFilters.myOpenActivitiesFilter())
    _renewalsCount = renewals.Count
    _renewalsPastDueCount = renewals.where(\renewal -> renewal.LatestPeriod.EditEffectiveDate < effDateCalculator.getRenewalEffectiveDate(Date.Today, renewal.LatestPeriod, renewal)).Count

    var cancellations = Job.finder.findJobsOfTypeByUser(typekey.Job.TC_CANCELLATION, user)
    cancellations.addFilter(DesktopJobFilters.myOpenActivitiesFilter())
    _cancellationsCount = cancellations.Count
    _cancellationsPastDueCount = cancellations
        .where(\cancellation -> cancellation.LatestPeriod.EditEffectiveDate < Date.Today).Count
  }

  property get ActivitiesLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Activities")
  }

  property get ActivitiesOverdueLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _activitiesPastDueCount)
  }

  property get ActivitiesBadgeColor(): GWColor {
    if (_activitiesPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get SubmissionsLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Submissions")
  }

  property get SubmissionsOverdueLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _submissionsPastDueCount)
  }

  property get SubmissionsBadgeColor(): GWColor {
    if (_submissionsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get ChangeRequestsLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.ChangeRequests")
  }

  property get ChangeRequestsOverdueLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _changeRequestsPastDueCount)
  }

  property get ChangeRequestsBadgeColor(): GWColor {
    if (_changeRequestsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get RenewalsLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Renewals")
  }

  property get RenewalsOverdueLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _renewalsPastDueCount)
  }

  property get RenewalsBadgeColor(): GWColor {
    if (_renewalsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get CancellationsLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Cancellations")
  }

  property get CancellationsOverdueLabel(): String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _cancellationsPastDueCount)
  }

  property get CancellationsBadgeColor(): GWColor {
    if (_cancellationsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
  return GWColor.THEME_PROGRESS_UNSTARTED
}
}