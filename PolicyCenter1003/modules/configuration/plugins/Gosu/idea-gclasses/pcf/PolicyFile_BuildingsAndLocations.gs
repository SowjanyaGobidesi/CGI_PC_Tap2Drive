package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policyfile/PolicyFile_BuildingsAndLocations.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_BuildingsAndLocations extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_BuildingsAndLocations, {period, asOfDate}, 0)
  }
  
  static function drilldown (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_BuildingsAndLocations, {period, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_BuildingsAndLocations, {period, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_BuildingsAndLocations, {period, asOfDate}, 0).goInMain()
  }
  
  static function printPage (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_BuildingsAndLocations, {period, asOfDate}, 0).printPage()
  }
  
  static function push (period :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_BuildingsAndLocations, {period, asOfDate}, 0).push()
  }
  
  
}