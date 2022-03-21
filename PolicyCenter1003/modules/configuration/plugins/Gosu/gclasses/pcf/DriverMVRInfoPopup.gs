package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/DriverMVRInfoPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DriverMVRInfoPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (mvrOrderArray :  gw.api.motorvehiclerecord.IMVROrder[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DriverMVRInfoPopup, {mvrOrderArray}, 0)
  }
  
  static function push (mvrOrderArray :  gw.api.motorvehiclerecord.IMVROrder[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DriverMVRInfoPopup, {mvrOrderArray}, 0).push()
  }
  
  
}