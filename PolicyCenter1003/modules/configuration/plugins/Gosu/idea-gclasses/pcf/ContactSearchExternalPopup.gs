package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/ContactSearchExternalPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactSearchExternalPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactSearchExternalPopup, {contactSearchResult}, 0)
  }
  
  static function push (contactSearchResult :  gw.plugin.contact.ContactResult) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactSearchExternalPopup, {contactSearchResult}, 0).push()
  }
  
  
}