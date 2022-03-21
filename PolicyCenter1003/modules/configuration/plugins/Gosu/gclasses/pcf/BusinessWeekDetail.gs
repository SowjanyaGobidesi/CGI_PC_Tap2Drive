package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/businessweek/BusinessWeekDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BusinessWeekDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (businessWeek :  BusinessWeek) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BusinessWeekDetail, {businessWeek}, 0)
  }
  
  static function drilldown (businessWeek :  BusinessWeek) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BusinessWeekDetail, {businessWeek}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (businessWeek :  BusinessWeek) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BusinessWeekDetail, {businessWeek}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (businessWeek :  BusinessWeek) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BusinessWeekDetail, {businessWeek}, 0).goInMain()
  }
  
  static function printPage (businessWeek :  BusinessWeek) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BusinessWeekDetail, {businessWeek}, 0).printPage()
  }
  
  static function push (businessWeek :  BusinessWeek) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BusinessWeekDetail, {businessWeek}, 0).push()
  }
  
  
}