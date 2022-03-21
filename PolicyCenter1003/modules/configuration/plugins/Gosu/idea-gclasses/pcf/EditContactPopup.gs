package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/EditContactPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditContactPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contact :  Contact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditContactPopup, {contact}, 0)
  }
  
  static function createDestination (contact :  Contact, canEdit :  Boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditContactPopup, {contact, canEdit}, 1)
  }
  
  function pickValueAndCommit (value :  Contact) : void {
    __widgetOf(this, pcf.EditContactPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditContactPopup, {contact}, 0).push()
  }
  
  static function push (contact :  Contact, canEdit :  Boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditContactPopup, {contact, canEdit}, 1).push()
  }
  
  
}