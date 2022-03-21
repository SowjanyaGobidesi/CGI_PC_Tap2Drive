package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedClusterForNewSubmissionForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedClusterForNewSubmissionForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedClusterForNewSubmissionForward, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedClusterForNewSubmissionForward, {}, 0).push()
  }
  
  
}