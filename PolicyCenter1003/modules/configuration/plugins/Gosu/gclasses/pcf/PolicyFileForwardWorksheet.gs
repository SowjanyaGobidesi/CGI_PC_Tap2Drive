package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFileForwardWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFileForwardWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, conditionType :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileForwardWorksheet, {policyPeriod, conditionType}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForwardWorksheet, {policyPeriod, conditionType}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForwardWorksheet, {policyPeriod, conditionType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForwardWorksheet, {policyPeriod, conditionType}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyPeriod :  PolicyPeriod, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForwardWorksheet, {policyPeriod, conditionType}, 0).goInWorkspace()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForwardWorksheet, {policyPeriod, conditionType}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, conditionType :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileForwardWorksheet, {policyPeriod, conditionType}, 0).push()
  }
  
  
}