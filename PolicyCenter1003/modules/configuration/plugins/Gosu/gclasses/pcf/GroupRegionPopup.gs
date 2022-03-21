package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/groups/GroupRegionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupRegionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GroupRegionPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  Region[]) : void {
    __widgetOf(this, pcf.GroupRegionPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupRegionPopup, {}, 0).push()
  }
  
  
}