package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/ActivityForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (activity :  Activity) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityForward, {activity}, 1)
  }
  
  static function createDestination (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyPeriod}, 0)
  }
  
  static function createDestination (activity :  Activity, policyNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyNumber}, 2)
  }
  
  static function drilldown (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity}, 1).drilldown()
  }
  
  static function drilldown (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyPeriod}, 0).drilldown()
  }
  
  static function drilldown (activity :  Activity, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyNumber}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyPeriod}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (activity :  Activity, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyNumber}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyPeriod}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (activity :  Activity, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyNumber}, 2).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity}, 1).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyPeriod}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (activity :  Activity, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyNumber}, 2).goInWorkspace()
  }
  
  static function printPage (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity}, 1).printPage()
  }
  
  static function printPage (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyPeriod}, 0).printPage()
  }
  
  static function printPage (activity :  Activity, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyNumber}, 2).printPage()
  }
  
  static function push (activity :  Activity) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity}, 1).push()
  }
  
  static function push (activity :  Activity, policyPeriod :  PolicyPeriod) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyPeriod}, 0).push()
  }
  
  static function push (activity :  Activity, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityForward, {activity, policyNumber}, 2).push()
  }
  
  
}