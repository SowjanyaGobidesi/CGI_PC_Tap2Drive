package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/assignment/MulticlusterAssignJobUserRolePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterAssignJobUserRolePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (jobs :  gw.api.web.desktop.data.JobDTO[], userRole :  typekey.UserRole) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterAssignJobUserRolePopup, {jobs, userRole}, 0)
  }
  
  function pickValueAndCommit (value :  GroupUser) : void {
    __widgetOf(this, pcf.MulticlusterAssignJobUserRolePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (jobs :  gw.api.web.desktop.data.JobDTO[], userRole :  typekey.UserRole) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterAssignJobUserRolePopup, {jobs, userRole}, 0).push()
  }
  
  
}