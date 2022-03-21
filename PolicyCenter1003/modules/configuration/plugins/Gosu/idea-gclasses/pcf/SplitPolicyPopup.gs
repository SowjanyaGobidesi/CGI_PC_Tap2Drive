package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/SplitPolicyPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SplitPolicyPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.SplitPolicyPopup, {policyPeriod}, 0)
  }
  
  static function push (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SplitPolicyPopup, {policyPeriod}, 0).push()
  }
  
  
}