package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/groupsearch/GroupSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GroupSearchPopup, {}, 0)
  }
  
  static function createDestination (excludeGroup :  Group, org :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GroupSearchPopup, {excludeGroup, org}, 1)
  }
  
  function pickValueAndCommit (value :  Group) : void {
    __widgetOf(this, pcf.GroupSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupSearchPopup, {}, 0).push()
  }
  
  static function push (excludeGroup :  Group, org :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupSearchPopup, {excludeGroup, org}, 1).push()
  }
  
  
}