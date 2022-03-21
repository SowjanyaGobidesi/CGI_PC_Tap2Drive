package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/AssignActivitiesPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AssignActivitiesPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (assignmentPopup :  gw.api.web.activity.ActivityAssignmentPopup) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AssignActivitiesPopup, {assignmentPopup}, 0)
  }
  
  function pickValueAndCommit (value :  gw.api.assignment.Assignee) : void {
    __widgetOf(this, pcf.AssignActivitiesPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (assignmentPopup :  gw.api.web.activity.ActivityAssignmentPopup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AssignActivitiesPopup, {assignmentPopup}, 0).push()
  }
  
  
}