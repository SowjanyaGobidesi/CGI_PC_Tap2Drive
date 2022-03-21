package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/MoreCPBuildingsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MoreCPBuildingsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (cpLocation :  CPLocation, buildings :  Building[], openForEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MoreCPBuildingsPopup, {cpLocation, buildings, openForEdit}, 0)
  }
  
  static function push (cpLocation :  CPLocation, buildings :  Building[], openForEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MoreCPBuildingsPopup, {cpLocation, buildings, openForEdit}, 0).push()
  }
  
  
}