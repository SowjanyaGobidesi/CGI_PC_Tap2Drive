package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/divide/SplitPolicy.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SplitPolicy extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (periodToDivide :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.SplitPolicy, {periodToDivide, asOfDate}, 0)
  }
  
  static function drilldown (periodToDivide :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SplitPolicy, {periodToDivide, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (periodToDivide :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SplitPolicy, {periodToDivide, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (periodToDivide :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SplitPolicy, {periodToDivide, asOfDate}, 0).goInMain()
  }
  
  static function printPage (periodToDivide :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SplitPolicy, {periodToDivide, asOfDate}, 0).printPage()
  }
  
  static function push (periodToDivide :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SplitPolicy, {periodToDivide, asOfDate}, 0).push()
  }
  
  
}