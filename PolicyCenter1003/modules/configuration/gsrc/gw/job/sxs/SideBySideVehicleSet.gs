package gw.job.sxs

uses java.util.Map
uses gw.util.Pair

@Export
class SideBySideVehicleSet {
  var _periodInfos : SideBySidePolicyPeriodInfo[] as SideBySidePeriods
  var _periodVehicleMap : Map<SideBySidePolicyPeriodInfo, entity.PersonalVehicle> as VehicleMap
  var _covSets : SideBySideCoverageSet[] as VehicleCovSets

  construct(periodInfos : SideBySidePolicyPeriodInfo[],
            periodVehMap : Map<SideBySidePolicyPeriodInfo, entity.PersonalVehicle>,
            covSets : SideBySideCoverageSet[]) {
    _periodInfos = periodInfos
    _periodVehicleMap = periodVehMap
    _covSets = covSets
  }

  // Return in the same order as periodInfos
  property get VehicleIndexAndLabels() : Pair<int,String>[] {
    return _periodInfos.map(\pi -> new Pair<int,String>(pi.ColumnIndex, VehicleMap.get(pi).DisplayName))
  }
}
