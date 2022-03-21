package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/BuildingSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BuildingSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BuildingSearchPopup, {period}, 0)
  }
  
  function pickValueAndCommit (value :  CPBuilding) : void {
    __widgetOf(this, pcf.BuildingSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (period :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BuildingSearchPopup, {period}, 0).push()
  }
  
  
}