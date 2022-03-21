package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/BCPolicy.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BCPolicy extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (billingSystemURL :  String, policyNumber :  String, termNumber :  int) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BCPolicy, {billingSystemURL, policyNumber, termNumber}, 0)
  }
  
  static function drilldown (billingSystemURL :  String, policyNumber :  String, termNumber :  int) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCPolicy, {billingSystemURL, policyNumber, termNumber}, 0).drilldown()
  }
  
  static function printPage (billingSystemURL :  String, policyNumber :  String, termNumber :  int) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCPolicy, {billingSystemURL, policyNumber, termNumber}, 0).printPage()
  }
  
  static function push (billingSystemURL :  String, policyNumber :  String, termNumber :  int) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCPolicy, {billingSystemURL, policyNumber, termNumber}, 0).push()
  }
  
  
}