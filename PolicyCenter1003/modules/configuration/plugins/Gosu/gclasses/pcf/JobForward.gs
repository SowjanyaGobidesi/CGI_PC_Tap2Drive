package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/JobForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (job :  Job) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobForward, {job}, 0)
  }
  
  static function createDestination (job :  Job, activity :  Activity) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobForward, {job, activity}, 3)
  }
  
  static function createDestination (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod}, 1)
  }
  
  static function createDestination (job :  Job, policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, activity}, 4)
  }
  
  static function createDestination (job :  Job, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, wizardStep}, 2)
  }
  
  static function drilldown (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job}, 0).drilldown()
  }
  
  static function drilldown (job :  Job, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, activity}, 3).drilldown()
  }
  
  static function drilldown (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod}, 1).drilldown()
  }
  
  static function drilldown (job :  Job, policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, activity}, 4).drilldown()
  }
  
  static function drilldown (job :  Job, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, wizardStep}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, activity}, 3).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job, policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, activity}, 4).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (job :  Job, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, wizardStep}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, activity}, 3).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job, policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, activity}, 4).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (job :  Job, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, wizardStep}, 2).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, activity}, 3).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod}, 1).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job, policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, activity}, 4).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (job :  Job, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, wizardStep}, 2).goInWorkspace()
  }
  
  static function printPage (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job}, 0).printPage()
  }
  
  static function printPage (job :  Job, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, activity}, 3).printPage()
  }
  
  static function printPage (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod}, 1).printPage()
  }
  
  static function printPage (job :  Job, policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, activity}, 4).printPage()
  }
  
  static function printPage (job :  Job, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, wizardStep}, 2).printPage()
  }
  
  static function push (job :  Job) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job}, 0).push()
  }
  
  static function push (job :  Job, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, activity}, 3).push()
  }
  
  static function push (job :  Job, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod}, 1).push()
  }
  
  static function push (job :  Job, policyPeriod :  PolicyPeriod, activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, activity}, 4).push()
  }
  
  static function push (job :  Job, policyPeriod :  PolicyPeriod, wizardStep :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobForward, {job, policyPeriod, wizardStep}, 2).push()
  }
  
  
}