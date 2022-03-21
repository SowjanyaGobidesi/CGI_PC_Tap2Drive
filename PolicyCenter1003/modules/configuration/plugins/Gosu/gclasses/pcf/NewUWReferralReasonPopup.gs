package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/NewUWReferralReasonPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewUWReferralReasonPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policy :  Policy) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewUWReferralReasonPopup, {policy}, 0)
  }
  
  static function push (policy :  Policy) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewUWReferralReasonPopup, {policy}, 0).push()
  }
  
  
}