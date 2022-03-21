package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/forwards/federated/FederatedActivityForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedActivityForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (activityPublicId :  java.lang.String, accountPublicId :  java.lang.String, activityId :  java.lang.String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedActivityForward, {activityPublicId, accountPublicId, activityId}, 0)
  }
  
  static function push (activityPublicId :  java.lang.String, accountPublicId :  java.lang.String, activityId :  java.lang.String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedActivityForward, {activityPublicId, accountPublicId, activityId}, 0).push()
  }
  
  
}