package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedContactClusterForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedContactClusterForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contactPublicId :  java.lang.String, shardId :  java.lang.String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedContactClusterForward, {contactPublicId, shardId}, 0)
  }
  
  static function push (contactPublicId :  java.lang.String, shardId :  java.lang.String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedContactClusterForward, {contactPublicId, shardId}, 0).push()
  }
  
  
}