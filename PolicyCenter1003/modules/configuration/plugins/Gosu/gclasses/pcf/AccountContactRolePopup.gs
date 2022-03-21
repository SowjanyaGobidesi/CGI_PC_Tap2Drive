package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountContactRolePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountContactRolePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (acctContactRole :  AccountContactRole) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountContactRolePopup, {acctContactRole}, 0)
  }
  
  static function push (acctContactRole :  AccountContactRole) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountContactRolePopup, {acctContactRole}, 0).push()
  }
  
  
}