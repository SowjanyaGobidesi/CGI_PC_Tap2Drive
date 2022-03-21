package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CopyBuildingCoveragesPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyBuildingCoveragesPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CopyBuildingCoveragesPopup, {period}, 0)
  }
  
  static function push (period :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CopyBuildingCoveragesPopup, {period}, 0).push()
  }
  
  
}