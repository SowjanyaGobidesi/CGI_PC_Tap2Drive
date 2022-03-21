package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewContactPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewContactPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contactType :  typekey.ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewContactPopup, {contactType}, 0)
  }
  
  function pickValueAndCommit (value :  Contact) : void {
    __widgetOf(this, pcf.NewContactPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContactPopup, {contactType}, 0).push()
  }
  
  
}