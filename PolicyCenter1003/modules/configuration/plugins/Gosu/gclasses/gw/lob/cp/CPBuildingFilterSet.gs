package gw.lob.cp

uses java.util.List

@Export
class CPBuildingFilterSet {

  var _buildings : CPBuilding[]
  
  construct(buildings : CPBuilding[]) {
    _buildings = buildings
  }

  function createBuildingFilters() : CPBuildingFilter[] {
    var locations = _buildings*.CPLocation.toSet().toList()
    var filters : List<CPBuildingFilter> = {}
    locations.sortBy(\ l -> l.Location.LocationNum).each(\ l -> filters.add(new CPBuildingFilter(l)))
    return filters?.toTypedArray()
  }
}
