package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BAVehicleTxDetailPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BAVehicleTxDetailPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (vehicle :  BusinessVehicle, vehicleTxs :  java.util.List<entity.BATransaction>) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BAVehicleTxDetailPopup, {vehicle, vehicleTxs}, 0)
  }
  
  static function push (vehicle :  BusinessVehicle, vehicleTxs :  java.util.List<entity.BATransaction>) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BAVehicleTxDetailPopup, {vehicle, vehicleTxs}, 0).push()
  }
  
  
}