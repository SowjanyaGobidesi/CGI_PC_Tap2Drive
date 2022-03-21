package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/addressbook/AddressBookDirectionsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AddressBookDirectionsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (directions :  gw.api.contact.DrivingDirections) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AddressBookDirectionsPopup, {directions}, 0)
  }
  
  static function push (directions :  gw.api.contact.DrivingDirections) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AddressBookDirectionsPopup, {directions}, 0).push()
  }
  
  
}