package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/assignment/AssigneePickerPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AssigneePickerPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (AssigneePicker :  gw.api.assignment.AssigneePicker) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AssigneePickerPopup, {AssigneePicker}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.assignment.Assignee) : void {
    __widgetOf(this, pcf.AssigneePickerPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (AssigneePicker :  gw.api.assignment.AssigneePicker) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AssigneePickerPopup, {AssigneePicker}, 0).push()
  }
  
  
}