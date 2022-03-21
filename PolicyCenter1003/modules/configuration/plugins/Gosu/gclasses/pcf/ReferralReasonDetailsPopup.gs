package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/ReferralReasonDetailsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReferralReasonDetailsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (referralReasons :  UWReferralReason[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ReferralReasonDetailsPopup, {referralReasons}, 0)
  }
  
  static function push (referralReasons :  UWReferralReason[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ReferralReasonDetailsPopup, {referralReasons}, 0).push()
  }
  
  
}