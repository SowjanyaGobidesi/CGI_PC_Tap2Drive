package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/NewOrganizationUserPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewOrganizationUserPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (organization :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewOrganizationUserPopup, {organization}, 0)
  }
  
  static function push (organization :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewOrganizationUserPopup, {organization}, 0).push()
  }
  
  
}