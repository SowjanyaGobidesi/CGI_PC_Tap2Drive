package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/NewFormPattern.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewFormPattern extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewFormPattern, {}, 0)
  }
  
  static function createDestination (dupFormPattern :  FormPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewFormPattern, {dupFormPattern}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {}, 0).drilldown()
  }
  
  static function drilldown (dupFormPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {dupFormPattern}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (dupFormPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {dupFormPattern}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (dupFormPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {dupFormPattern}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {}, 0).printPage()
  }
  
  static function printPage (dupFormPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {dupFormPattern}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {}, 0).push()
  }
  
  static function push (dupFormPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewFormPattern, {dupFormPattern}, 1).push()
  }
  
  
}