package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/regions/RegionsForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RegionsForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RegionsForward, {}, 0)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RegionsForward, {}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RegionsForward, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RegionsForward, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RegionsForward, {}, 0).goInWorkspace()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RegionsForward, {}, 0).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RegionsForward, {}, 0).push()
  }
  
  
}