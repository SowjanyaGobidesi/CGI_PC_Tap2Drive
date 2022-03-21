package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedAccountForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedAccountForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountPublicId :  java.lang.String, accountNumber :  java.lang.String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedAccountForward, {accountPublicId, accountNumber}, 0)
  }
  
  static function push (accountPublicId :  java.lang.String, accountNumber :  java.lang.String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedAccountForward, {accountPublicId, accountNumber}, 0).push()
  }
  
  
}