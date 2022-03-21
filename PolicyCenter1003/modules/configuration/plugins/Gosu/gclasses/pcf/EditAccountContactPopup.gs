package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/EditAccountContactPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditAccountContactPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountContact :  AccountContact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditAccountContactPopup, {accountContact}, 0)
  }
  
  static function createDestination (accountContact :  AccountContact, resolvingConflict :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditAccountContactPopup, {accountContact, resolvingConflict}, 1)
  }
  
  static function createDestination (accountContact :  AccountContact, resolvingConflict :  boolean, showRolesTab :  boolean, showAddressTools :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditAccountContactPopup, {accountContact, resolvingConflict, showRolesTab, showAddressTools}, 2)
  }
  
  function pickValueAndCommit (value :  AccountContact) : void {
    __widgetOf(this, pcf.EditAccountContactPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (accountContact :  AccountContact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAccountContactPopup, {accountContact}, 0).push()
  }
  
  static function push (accountContact :  AccountContact, resolvingConflict :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAccountContactPopup, {accountContact, resolvingConflict}, 1).push()
  }
  
  static function push (accountContact :  AccountContact, resolvingConflict :  boolean, showRolesTab :  boolean, showAddressTools :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAccountContactPopup, {accountContact, resolvingConflict, showRolesTab, showAddressTools}, 2).push()
  }
  
  
}