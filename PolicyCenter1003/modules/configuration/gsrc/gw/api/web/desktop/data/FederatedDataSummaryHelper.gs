package gw.api.web.desktop.data

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.web.color.GWColor
uses gw.api.web.desktop.data.common.SummaryCountsDTO
uses gw.plugin.Plugins
uses gw.plugin.multicluster.federateddata.IFederatedDataPlugin

@Export
class FederatedDataSummaryHelper {

  var _logger = PCLoggerCategory.FEDERATED_DATA_PLUGIN

  var _activitiesCount : int as readonly ActivitiesCount = 0
  var _submissionsCount : int as readonly SubmissionsCount = 0
  var _changeRequestsCount : int as readonly ChangeRequestsCount = 0
  var _renewalsCount : int as readonly RenewalsCount = 0
  var _cancellationsCount : int as readonly CancellationsCount = 0

  var _activitiesPastDueCount : int = 0
  var _submissionsPastDueCount : int = 0
  var _changeRequestsPastDueCount : int = 0
  var _renewalsPastDueCount : int = 0
  var _cancellationsPastDueCount : int = 0

  @SuppressWarnings("HiddenPackageReference")
  construct(user : User) {
    var plugin = Plugins.get(IFederatedDataPlugin)

    try {
      var summarcyCounts = plugin.getUserSummaryCounts(user.PublicID) as SummaryCountsDTO
      _activitiesCount = summarcyCounts.Counts.ActivitiesCount
      _submissionsCount = summarcyCounts.Counts.SubmissionsCount
      _changeRequestsCount = summarcyCounts.Counts.ChangeRequestsCount
      _renewalsCount = summarcyCounts.Counts.RenewalsCount
      _cancellationsCount = summarcyCounts.Counts.CancellationsCount

      _activitiesPastDueCount = summarcyCounts.OverdueCounts.ActivitiesCount
      _submissionsPastDueCount = summarcyCounts.OverdueCounts.SubmissionsCount
      _changeRequestsPastDueCount = summarcyCounts.OverdueCounts.ChangeRequestsCount
      _renewalsPastDueCount = summarcyCounts.OverdueCounts.RenewalsCount
      _cancellationsPastDueCount = summarcyCounts.OverdueCounts.CancellationsCount
    } catch (ex : DisplayableException) {
      _logger.error("Could not get counts summary.", ex)
    }
  }

  property get ActivitiesLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Activities")
  }

  property get ActivitiesOverdueLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _activitiesPastDueCount)
  }

  property get ActivitiesBadgeColor() : GWColor {
    if (_activitiesPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get SubmissionsLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Submissions")
  }

  property get SubmissionsOverdueLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _submissionsPastDueCount)
  }

  property get SubmissionsBadgeColor() : GWColor {
    if (_submissionsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get ChangeRequestsLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.ChangeRequests")
  }

  property get ChangeRequestsOverdueLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _changeRequestsPastDueCount)
  }

  property get ChangeRequestsBadgeColor() : GWColor {
    if (_changeRequestsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get RenewalsLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Renewals")
  }

  property get RenewalsOverdueLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _renewalsPastDueCount)
  }

  property get RenewalsBadgeColor() : GWColor {
    if (_renewalsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }

  property get CancellationsLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Cancellations")
  }

  property get CancellationsOverdueLabel() : String {
    return DisplayKey.get("Web.Dashboard.Tile.Overview.Overdue", _cancellationsPastDueCount)
  }

  property get CancellationsBadgeColor() : GWColor {
    if (_cancellationsPastDueCount > 0) {
      return GWColor.THEME_PROGRESS_OVERDUE
    }
    return GWColor.THEME_PROGRESS_UNSTARTED
  }
}