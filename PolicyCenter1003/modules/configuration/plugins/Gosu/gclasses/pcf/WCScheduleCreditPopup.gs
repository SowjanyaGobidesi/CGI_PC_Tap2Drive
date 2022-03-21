package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCScheduleCreditPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCScheduleCreditPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (scheduleRate :  Modifier, openForEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WCScheduleCreditPopup, {scheduleRate, openForEdit}, 0)
  }
  
  static function push (scheduleRate :  Modifier, openForEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.WCScheduleCreditPopup, {scheduleRate, openForEdit}, 0).push()
  }
  
  
}