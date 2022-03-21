package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyAsLossDateForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyAsLossDateForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyAsLossDateForward, {policyNumber, retrieveAsOfDate}, 0)
  }
  
  static function drilldown (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyAsLossDateForward, {policyNumber, retrieveAsOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyAsLossDateForward, {policyNumber, retrieveAsOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyAsLossDateForward, {policyNumber, retrieveAsOfDate}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyAsLossDateForward, {policyNumber, retrieveAsOfDate}, 0).goInWorkspace()
  }
  
  static function printPage (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyAsLossDateForward, {policyNumber, retrieveAsOfDate}, 0).printPage()
  }
  
  static function push (policyNumber :  String, retrieveAsOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyAsLossDateForward, {policyNumber, retrieveAsOfDate}, 0).push()
  }
  
  
}