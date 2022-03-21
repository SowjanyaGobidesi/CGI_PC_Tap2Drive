package gw.api.web.desktop.data.account

uses gw.api.locale.DisplayKey
uses gw.api.web.desktop.data.filter.FederatedDataFilter

@Export
class AccountDataFilters {

  static function allFilters() : FederatedDataFilter[] {
    return {all(), allPending(), createdPast7Days()}
  }

  static function all() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Accounts.All"), "ALL")
  }

  static function allPending() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Accounts.AllPending"), "ALL_PENDING")
  }

  static function createdPast7Days() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Accounts.CreatedInPast7Days"), "CREATED_IN_PAST_7_DAYS")
  }

}