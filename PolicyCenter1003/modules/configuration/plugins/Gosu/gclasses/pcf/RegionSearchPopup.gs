package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/RegionSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RegionSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyHold :  PolicyHold) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RegionSearchPopup, {policyHold}, 0)
  }
  
  function pickValueAndCommit (value :  entity.Zone[]) : void {
    __widgetOf(this, pcf.RegionSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyHold :  PolicyHold) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RegionSearchPopup, {policyHold}, 0).push()
  }
  
  
}