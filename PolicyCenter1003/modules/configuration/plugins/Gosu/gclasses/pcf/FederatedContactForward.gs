package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedContactForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedContactForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountPublicId :  java.lang.String, contactPublicId :  java.lang.String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedContactForward, {accountPublicId, contactPublicId}, 0)
  }
  
  static function push (accountPublicId :  java.lang.String, contactPublicId :  java.lang.String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedContactForward, {accountPublicId, contactPublicId}, 0).push()
  }
  
  
}