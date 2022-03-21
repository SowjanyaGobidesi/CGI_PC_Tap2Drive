package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPBuildingCostDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPBuildingCostDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (buildingCosts :  java.util.Set<CPCost>, building :  CPBuilding) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPBuildingCostDetailsPopup, {buildingCosts, building}, 0)
  }
  
  static function push (buildingCosts :  java.util.Set<CPCost>, building :  CPBuilding) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPBuildingCostDetailsPopup, {buildingCosts, building}, 0).push()
  }
  
  
}