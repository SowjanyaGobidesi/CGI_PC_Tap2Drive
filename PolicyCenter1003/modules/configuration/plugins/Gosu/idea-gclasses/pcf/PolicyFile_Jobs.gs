package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_Jobs.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Jobs extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate}, 0)
  }
  
  static function createDestination (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, initialSelectedJob :  Job) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate, initialSelectedJob}, 1)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate}, 0).drilldown()
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, initialSelectedJob :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate, initialSelectedJob}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, initialSelectedJob :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate, initialSelectedJob}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, initialSelectedJob :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate, initialSelectedJob}, 1).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate}, 0).printPage()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, initialSelectedJob :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate, initialSelectedJob}, 1).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate}, 0).push()
  }
  
  static function push (policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date, initialSelectedJob :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFile_Jobs, {policyPeriod, asOfDate, initialSelectedJob}, 1).push()
  }
  
  
}