package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/submgr/NotTakenReasonPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NotTakenReasonPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (submission :  Submission, policyPeriod :  PolicyPeriod, wizard :  pcf.api.Wizard) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NotTakenReasonPopup, {submission, policyPeriod, wizard}, 0)
  }
  
  static function push (submission :  Submission, policyPeriod :  PolicyPeriod, wizard :  pcf.api.Wizard) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NotTakenReasonPopup, {submission, policyPeriod, wizard}, 0).push()
  }
  
  
}