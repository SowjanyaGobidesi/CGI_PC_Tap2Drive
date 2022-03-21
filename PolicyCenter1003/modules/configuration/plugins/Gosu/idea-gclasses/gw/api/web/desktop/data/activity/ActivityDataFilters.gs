package gw.api.web.desktop.data.activity

uses gw.api.locale.DisplayKey
uses gw.api.web.desktop.data.filter.FederatedDataFilter

@Export
class ActivityDataFilters {

  static function allFilters() : FederatedDataFilter[] {
    return {allOpen(), dueToday(), dueSoon(), overdue(), closedLast30Days()}
  }

  static function allOpen() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.ToolBar.Activities.AllOpen"), "ALL_OPEN")
  }

  static function dueToday() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.ToolBar.Activities.CurrentOpen"), "DUE_TODAY")
  }

  static function dueSoon() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.ToolBar.Activities.Due7Days"), "DUE_WITHIN_7_DAYS")
  }

  static function overdue() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.ToolBar.Activities.Overdue"), "OVERDUE")
  }

  static function closedLast30Days() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.ToolBar.Activities.ClosedLastNDays", 30), "CLOSED_IN_LAST_30_DAYS")
  }

}