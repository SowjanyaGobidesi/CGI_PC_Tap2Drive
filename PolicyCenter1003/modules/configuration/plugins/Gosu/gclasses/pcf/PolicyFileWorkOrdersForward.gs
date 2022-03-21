package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFileWorkOrdersForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFileWorkOrdersForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod}, 0)
  }
  
  static function createDestination (job :  Job, policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod, asOfDate}, 1)
  }
  
  static function drilldown (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod}, 0).drilldown()
  }
  
  static function drilldown (job :  Job, policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod, asOfDate}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job, policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod, asOfDate}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job, policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod, asOfDate}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job, policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod, asOfDate}, 1).goInWorkspace()
  }
  
  static function printPage (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod}, 0).printPage()
  }
  
  static function printPage (job :  Job, policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod, asOfDate}, 1).printPage()
  }
  
  static function push (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod}, 0).push()
  }
  
  static function push (job :  Job, policyPeriod :  PolicyPeriod, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PolicyFileWorkOrdersForward, {job, policyPeriod, asOfDate}, 1).push()
  }
  
  
}