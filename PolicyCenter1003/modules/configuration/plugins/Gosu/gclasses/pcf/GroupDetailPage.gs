package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/GroupDetailPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupDetailPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (group :  Group) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.GroupDetailPage, {group}, 0)
  }
  
  static function drilldown (group :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupDetailPage, {group}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (group :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupDetailPage, {group}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (group :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupDetailPage, {group}, 0).goInMain()
  }
  
  static function printPage (group :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupDetailPage, {group}, 0).printPage()
  }
  
  static function push (group :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.GroupDetailPage, {group}, 0).push()
  }
  
  
}