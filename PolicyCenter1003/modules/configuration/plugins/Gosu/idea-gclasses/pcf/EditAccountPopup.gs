package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/EditAccountPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditAccountPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (account :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditAccountPopup, {account}, 0)
  }
  
  static function push (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditAccountPopup, {account}, 0).push()
  }
  
  
}