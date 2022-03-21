package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPBuildingTxDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPBuildingTxDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (buildingTransactions :  java.util.Set<CPTransaction>, building :  CPBuilding) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CPBuildingTxDetailsPopup, {buildingTransactions, building}, 0)
  }
  
  static function push (buildingTransactions :  java.util.Set<CPTransaction>, building :  CPBuilding) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CPBuildingTxDetailsPopup, {buildingTransactions, building}, 0).push()
  }
  
  
}