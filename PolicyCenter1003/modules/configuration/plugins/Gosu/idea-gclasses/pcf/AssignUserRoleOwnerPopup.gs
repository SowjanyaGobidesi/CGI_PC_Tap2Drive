package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/assignment/AssignUserRoleOwnerPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AssignUserRoleOwnerPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (userRoleOwners :  gw.api.assignment.UserRoleOwner[], userRole :  typekey.UserRole) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AssignUserRoleOwnerPopup, {userRoleOwners, userRole}, 0)
  }
  
  function pickValueAndCommit (value :  GroupUser) : void {
    __widgetOf(this, pcf.AssignUserRoleOwnerPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (userRoleOwners :  gw.api.assignment.UserRoleOwner[], userRole :  typekey.UserRole) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AssignUserRoleOwnerPopup, {userRoleOwners, userRole}, 0).push()
  }
  
  
}