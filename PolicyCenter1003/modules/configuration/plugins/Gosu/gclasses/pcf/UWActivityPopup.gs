package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/UWActivityPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWActivityPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, activityPattern :  ActivityPattern, approvalOption :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UWActivityPopup, {policyPeriod, activityPattern, approvalOption}, 0)
  }
  
  static function push (policyPeriod :  PolicyPeriod, activityPattern :  ActivityPattern, approvalOption :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.UWActivityPopup, {policyPeriod, activityPattern, approvalOption}, 0).push()
  }
  
  
}