package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/util/DefaultFailurePage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DefaultFailurePage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DefaultFailurePage, {}, 0)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.DefaultFailurePage, {}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.DefaultFailurePage, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.DefaultFailurePage, {}, 0).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.DefaultFailurePage, {}, 0).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.DefaultFailurePage, {}, 0).push()
  }
  
  
}