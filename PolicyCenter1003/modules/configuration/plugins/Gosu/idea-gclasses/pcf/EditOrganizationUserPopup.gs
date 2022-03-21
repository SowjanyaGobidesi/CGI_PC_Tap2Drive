package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/EditOrganizationUserPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditOrganizationUserPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (user :  User) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditOrganizationUserPopup, {user}, 0)
  }
  
  static function push (user :  User) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditOrganizationUserPopup, {user}, 0).push()
  }
  
  
}