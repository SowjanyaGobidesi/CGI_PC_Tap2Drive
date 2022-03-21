package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/assignment/GroupUserPickerPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupUserPickerPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GroupUserPickerPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  GroupUser) : void {
    __widgetOf(this, pcf.GroupUserPickerPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupUserPickerPopup, {}, 0).push()
  }
  
  
}