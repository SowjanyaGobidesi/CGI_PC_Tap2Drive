package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/EditPolicyContactRolePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditPolicyContactRolePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyContactRole :  PolicyContactRole, canEdit :  Boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditPolicyContactRolePopup, {policyContactRole, canEdit}, 0)
  }
  
  function pickValueAndCommit (value :  PolicyContactRole) : void {
    __widgetOf(this, pcf.EditPolicyContactRolePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyContactRole :  PolicyContactRole, canEdit :  Boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditPolicyContactRolePopup, {policyContactRole, canEdit}, 0).push()
  }
  
  
}