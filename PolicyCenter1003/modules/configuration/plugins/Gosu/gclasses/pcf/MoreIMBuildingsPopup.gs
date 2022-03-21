package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/MoreIMBuildingsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MoreIMBuildingsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (imLocation :  IMLocation, buildings :  Building[], openForEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MoreIMBuildingsPopup, {imLocation, buildings, openForEdit}, 0)
  }
  
  static function push (imLocation :  IMLocation, buildings :  Building[], openForEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MoreIMBuildingsPopup, {imLocation, buildings, openForEdit}, 0).push()
  }
  
  
}