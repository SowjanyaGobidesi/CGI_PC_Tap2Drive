package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/VehicleClassCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VehicleClassCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (bAVehicleEU :  BusinessVehicle, businessAutoLine :  BusinessAutoLine) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.VehicleClassCodeSearchPopup, {bAVehicleEU, businessAutoLine}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.domain.VehicleClassCodeSearchResult) : void {
    __widgetOf(this, pcf.VehicleClassCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (bAVehicleEU :  BusinessVehicle, businessAutoLine :  BusinessAutoLine) : pcf.api.Location {
    return __newDestinationForLocation(pcf.VehicleClassCodeSearchPopup, {bAVehicleEU, businessAutoLine}, 0).push()
  }
  
  
}