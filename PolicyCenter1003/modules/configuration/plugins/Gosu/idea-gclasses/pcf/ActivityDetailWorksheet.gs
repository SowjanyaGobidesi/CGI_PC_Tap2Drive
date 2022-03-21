package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/ActivityDetailWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityDetailWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (activity :  Activity) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityDetailWorksheet, {activity}, 0)
  }
  
  static function createDestination (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityDetailWorksheet, {activity, policyPeriod}, 1)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityDetailWorksheet, {activity}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityDetailWorksheet, {activity, policyPeriod}, 1).goInWorkspace()
  }
  
  static function push (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityDetailWorksheet, {activity}, 0).push()
  }
  
  static function push (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityDetailWorksheet, {activity, policyPeriod}, 1).push()
  }
  
  
}