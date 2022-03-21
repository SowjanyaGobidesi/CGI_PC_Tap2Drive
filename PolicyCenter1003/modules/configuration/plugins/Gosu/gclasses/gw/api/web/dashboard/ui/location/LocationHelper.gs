package gw.api.web.dashboard.ui.location

uses gw.api.locale.DisplayKey
uses gw.api.web.dashboard.ui.DashboardParameters

@Export
class LocationHelper {

  final var locationComparator: Comparator<AccountLocation> = \location1, location2 ->
      location1.Primary == location2.Primary
          ? getName(location1).compareTo(getName(location2))
          : location1.Primary ? -1 : 1

  final var _locations: AccountLocation[]as readonly Locations
  final var _viewMoreVisible: boolean as readonly ViewMoreVisible

  construct(account: Account) {
    this(account, DashboardParameters.ListViewLimitShort)
  }

  construct(account: Account, limit: int) {
    var locations = account.AccountLocations
        .where(\al -> al.Active)
        .sort(locationComparator)

    _viewMoreVisible = locations.Count > limit
    _locations = locations.limit(limit)
  }

  function getName(location: AccountLocation): String {
    if (location.LocationName.HasContent) {
      return location.LocationName
    }

    if (location.LocationCode.HasContent) {
      return location.LocationCode
    }

    if (location.Primary) {
      return DisplayKey.get("Web.Dashboard.Tile.Locations.Primary")
    }

    return DisplayKey.get("Web.Dashboard.Tile.Locations.Number", location.LocationNum)
  }

  function getAddress(location: AccountLocation): String {
    return location.addressString(",", :includeCountry = false, :includeCounty = false)
  }
}