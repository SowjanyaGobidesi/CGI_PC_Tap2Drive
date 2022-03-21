package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/usersearch/UserSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserSearchPopup, {}, 0)
  }
  
  static function createDestination (organization :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserSearchPopup, {organization}, 1)
  }
  
  static function createDestination (organization :  Organization, userType :  UserType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserSearchPopup, {organization, userType}, 2)
  }
  
  function pickValueAndCommit (value :  User) : void {
    __widgetOf(this, pcf.UserSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserSearchPopup, {}, 0).push()
  }
  
  static function push (organization :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserSearchPopup, {organization}, 1).push()
  }
  
  static function push (organization :  Organization, userType :  UserType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserSearchPopup, {organization, userType}, 2).push()
  }
  
  
}