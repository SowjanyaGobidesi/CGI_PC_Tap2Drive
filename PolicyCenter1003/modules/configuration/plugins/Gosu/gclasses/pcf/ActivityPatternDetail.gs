package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ActivityPatternDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityPatternDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (activityPattern :  ActivityPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ActivityPatternDetail, {activityPattern}, 0)
  }
  
  static function drilldown (activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityPatternDetail, {activityPattern}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityPatternDetail, {activityPattern}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityPatternDetail, {activityPattern}, 0).goInMain()
  }
  
  static function printPage (activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityPatternDetail, {activityPattern}, 0).printPage()
  }
  
  static function push (activityPattern :  ActivityPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ActivityPatternDetail, {activityPattern}, 0).push()
  }
  
  
}