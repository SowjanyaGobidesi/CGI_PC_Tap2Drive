package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_Summary.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Summary extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate}, 1)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, errorMessage :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate, errorMessage}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate}, 1).drilldown()
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate, errorMessage}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate, errorMessage}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate, errorMessage}, 0).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate}, 1).printPage()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate, errorMessage}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate}, 1).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, errorMessage :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Summary, {policyPeriod, asOfDate, errorMessage}, 0).push()
  }
  
  
}