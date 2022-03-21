package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedJobForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedJobForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (jobNumber :  java.lang.String, accountPublicId :  java.lang.String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedJobForward, {jobNumber, accountPublicId}, 0)
  }
  
  static function push (jobNumber :  java.lang.String, accountPublicId :  java.lang.String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedJobForward, {jobNumber, accountPublicId}, 0).push()
  }
  
  
}