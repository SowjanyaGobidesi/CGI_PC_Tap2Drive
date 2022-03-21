package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_Transactions_ByCostKeyPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Transactions_ByCostKeyPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Transactions_ByCostKeyPopup, {period}, 0)
  }
  
  static function push (period :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Transactions_ByCostKeyPopup, {period}, 0).push()
  }
  
  
}