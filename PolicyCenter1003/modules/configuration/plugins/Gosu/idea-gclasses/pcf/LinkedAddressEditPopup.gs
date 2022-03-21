package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/LinkedAddressEditPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LinkedAddressEditPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (address :  Address) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LinkedAddressEditPopup, {address}, 0)
  }
  
  static function push (address :  Address) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LinkedAddressEditPopup, {address}, 0).push()
  }
  
  
}