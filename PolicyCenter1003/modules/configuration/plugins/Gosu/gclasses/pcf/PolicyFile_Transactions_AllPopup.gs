package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_Transactions_AllPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Transactions_AllPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Transactions_AllPopup, {period, asOfDate}, 0)
  }
  
  static function push (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Transactions_AllPopup, {period, asOfDate}, 0).push()
  }
  
  
}