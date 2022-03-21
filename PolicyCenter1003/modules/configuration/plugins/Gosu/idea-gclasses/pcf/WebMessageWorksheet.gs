package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/util/WebMessageWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WebMessageWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.WebMessageWorksheet, {}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.WebMessageWorksheet, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.WebMessageWorksheet, {}, 0).goInMain()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.WebMessageWorksheet, {}, 0).push()
  }
  
  
}