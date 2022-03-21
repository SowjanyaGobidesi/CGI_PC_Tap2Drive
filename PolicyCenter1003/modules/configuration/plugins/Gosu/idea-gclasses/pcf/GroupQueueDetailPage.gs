package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/GroupQueueDetailPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupQueueDetailPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (group :  Group, assignableQueue :  AssignableQueue) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GroupQueueDetailPage, {group, assignableQueue}, 0)
  }
  
  static function drilldown (group :  Group, assignableQueue :  AssignableQueue) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupQueueDetailPage, {group, assignableQueue}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (group :  Group, assignableQueue :  AssignableQueue) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupQueueDetailPage, {group, assignableQueue}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (group :  Group, assignableQueue :  AssignableQueue) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupQueueDetailPage, {group, assignableQueue}, 0).goInMain()
  }
  
  static function printPage (group :  Group, assignableQueue :  AssignableQueue) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupQueueDetailPage, {group, assignableQueue}, 0).printPage()
  }
  
  static function push (group :  Group, assignableQueue :  AssignableQueue) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupQueueDetailPage, {group, assignableQueue}, 0).push()
  }
  
  
}