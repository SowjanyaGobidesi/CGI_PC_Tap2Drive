package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BAVehicleCostDetailPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BAVehicleCostDetailPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (vehicle :  BusinessVehicle, vehicleCosts :  java.util.List<entity.BACost>) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BAVehicleCostDetailPopup, {vehicle, vehicleCosts}, 0)
  }
  
  static function push (vehicle :  BusinessVehicle, vehicleCosts :  java.util.List<entity.BACost>) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BAVehicleCostDetailPopup, {vehicle, vehicleCosts}, 0).push()
  }
  
  
}