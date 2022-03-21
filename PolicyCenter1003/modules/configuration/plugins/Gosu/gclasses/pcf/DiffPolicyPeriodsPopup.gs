package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/DiffPolicyPeriodsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DiffPolicyPeriodsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (firstPeriod :  PolicyPeriod, secondPeriod :  PolicyPeriod, policyFilePeriod :  PolicyPeriod, asOfDate :  java.util.Date, title :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DiffPolicyPeriodsPopup, {firstPeriod, secondPeriod, policyFilePeriod, asOfDate, title}, 0)
  }
  
  static function push (firstPeriod :  PolicyPeriod, secondPeriod :  PolicyPeriod, policyFilePeriod :  PolicyPeriod, asOfDate :  java.util.Date, title :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DiffPolicyPeriodsPopup, {firstPeriod, secondPeriod, policyFilePeriod, asOfDate, title}, 0).push()
  }
  
  
}