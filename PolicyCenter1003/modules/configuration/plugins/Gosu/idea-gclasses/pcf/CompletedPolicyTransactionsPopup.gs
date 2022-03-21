package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/CompletedPolicyTransactionsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CompletedPolicyTransactionsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriods :  PolicyPeriod[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CompletedPolicyTransactionsPopup, {policyPeriods}, 0)
  }
  
  static function push (policyPeriods :  PolicyPeriod[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CompletedPolicyTransactionsPopup, {policyPeriods}, 0).push()
  }
  
  
}