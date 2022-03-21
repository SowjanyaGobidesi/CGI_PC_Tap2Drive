package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/DuplicateContactsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DuplicateContactsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contactHelper :  gw.pcf.duplicatecontacts.DuplicateContactsPopupHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DuplicateContactsPopup, {contactHelper}, 0)
  }
  
  static function push (contactHelper :  gw.pcf.duplicatecontacts.DuplicateContactsPopupHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DuplicateContactsPopup, {contactHelper}, 0).push()
  }
  
  
}