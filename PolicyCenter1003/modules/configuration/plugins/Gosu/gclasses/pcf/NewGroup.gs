package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/NewGroup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewGroup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewGroup, {}, 0)
  }
  
  static function createDestination (parent :  Group) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewGroup, {parent}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {}, 0).drilldown()
  }
  
  static function drilldown (parent :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {parent}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (parent :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {parent}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (parent :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {parent}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {}, 0).printPage()
  }
  
  static function printPage (parent :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {parent}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {}, 0).push()
  }
  
  static function push (parent :  Group) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewGroup, {parent}, 1).push()
  }
  
  
}