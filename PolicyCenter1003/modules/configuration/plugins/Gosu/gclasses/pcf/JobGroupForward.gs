package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/JobGroupForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobGroupForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (jobGroup :  JobGroup) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobGroupForward, {jobGroup}, 0)
  }
  
  static function drilldown (jobGroup :  JobGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobGroupForward, {jobGroup}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (jobGroup :  JobGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobGroupForward, {jobGroup}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (jobGroup :  JobGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobGroupForward, {jobGroup}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (jobGroup :  JobGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobGroupForward, {jobGroup}, 0).goInWorkspace()
  }
  
  static function printPage (jobGroup :  JobGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobGroupForward, {jobGroup}, 0).printPage()
  }
  
  static function push (jobGroup :  JobGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobGroupForward, {jobGroup}, 0).push()
  }
  
  
}