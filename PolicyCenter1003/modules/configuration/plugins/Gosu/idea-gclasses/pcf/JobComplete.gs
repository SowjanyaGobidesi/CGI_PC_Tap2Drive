package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/JobComplete.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobComplete extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobComplete, {job, policyPeriod}, 0)
  }
  
  static function drilldown (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobComplete, {job, policyPeriod}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobComplete, {job, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobComplete, {job, policyPeriod}, 0).goInMain()
  }
  
  static function printPage (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobComplete, {job, policyPeriod}, 0).printPage()
  }
  
  static function push (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobComplete, {job, policyPeriod}, 0).push()
  }
  
  
}