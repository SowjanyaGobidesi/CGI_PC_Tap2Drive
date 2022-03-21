package gw.api.web.desktop.data

uses gw.api.locale.DisplayKey
uses gw.api.web.desktop.data.filter.FederatedDataFilter

@Export
class JobDataFilters {
  static function producerFilters() : FederatedDataFilter[] {
    return {open(), createdPast7Days(), completedPast30Days()}
  }

  static function activityFilters() : FederatedDataFilter[] {
    return {openActivities(), openActivitiesDue7Days()}
  }

  static function open() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.Open"), "OPEN")
  }

  static function createdPast7Days() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.Created7Days"), "CREATED_IN_PAST_7_DAYS")
  }

  static function completedPast30Days() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.Completed30Days"), "COMPLETED_IN_PAST_30_DAYS")
  }

  static function openActivities() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Activities.Open"), "OPEN_ACTIVITIES")
  }

  static function openActivitiesDue7Days() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Activities.Created7Days"), "OPEN_ACTIVITIES_DUE_7_DAYS")
  }
}