package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedClusterForNewAccountForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedClusterForNewAccountForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedClusterForNewAccountForward, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedClusterForNewAccountForward, {}, 0).push()
  }
  
  
}