package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/UserContactDetailPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserContactDetailPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (User :  User) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserContactDetailPopup, {User}, 0)
  }
  
  function pickValueAndCommit (value :  Contact) : void {
    __widgetOf(this, pcf.UserContactDetailPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (User :  User) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserContactDetailPopup, {User}, 0).push()
  }
  
  
}