package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/RoleDetailPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RoleDetailPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (role :  Role) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RoleDetailPage, {role}, 0)
  }
  
  static function drilldown (role :  Role) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RoleDetailPage, {role}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (role :  Role) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RoleDetailPage, {role}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (role :  Role) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RoleDetailPage, {role}, 0).goInMain()
  }
  
  static function printPage (role :  Role) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RoleDetailPage, {role}, 0).printPage()
  }
  
  static function push (role :  Role) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RoleDetailPage, {role}, 0).push()
  }
  
  
}