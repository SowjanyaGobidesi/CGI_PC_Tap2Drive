package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BAVehicleSchedulePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BAVehicleSchedulePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (baLine :  BusinessAutoLine, selectedState :  State) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BAVehicleSchedulePopup, {baLine, selectedState}, 0)
  }
  
  static function push (baLine :  BusinessAutoLine, selectedState :  State) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BAVehicleSchedulePopup, {baLine, selectedState}, 0).push()
  }
  
  
}