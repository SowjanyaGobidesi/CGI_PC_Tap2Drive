package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedPolicyForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedPolicyForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPublicId :  java.lang.String, policyNumber :  java.lang.String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedPolicyForward, {policyPublicId, policyNumber}, 0)
  }
  
  static function push (policyPublicId :  java.lang.String, policyNumber :  java.lang.String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedPolicyForward, {policyPublicId, policyNumber}, 0).push()
  }
  
  
}