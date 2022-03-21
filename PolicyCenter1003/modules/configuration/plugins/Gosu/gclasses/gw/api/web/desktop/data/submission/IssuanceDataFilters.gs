package gw.api.web.desktop.data.submission

uses gw.api.locale.DisplayKey
uses gw.api.web.desktop.data.JobDataFilters
uses gw.api.web.desktop.data.filter.FederatedDataFilter

@Export
class IssuanceDataFilters {

  static function openIssuance() : FederatedDataFilter {
    return new FederatedDataFilter(DisplayKey.get("Java.Desktop.ToolbarFilter.Jobs.OpenIssuance"), "OPEN_ISSUANCE")
  }

}