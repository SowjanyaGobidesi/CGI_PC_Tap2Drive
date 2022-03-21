package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile extends com.guidewire.pl.web.codegen.LocationGroupBase {
  static function createDestination (policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod}, 1)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod, asOfDate}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod}, 1).drilldown()
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod, asOfDate}, 0).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod}, 1).printPage()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod, asOfDate}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod}, 1).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.PolicyFile, {policyPeriod, asOfDate}, 0).push()
  }
  
  
}