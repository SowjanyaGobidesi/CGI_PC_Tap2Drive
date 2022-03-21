package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/Help.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Help extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.Help, {}, 0)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.Help, {}, 0).drilldown()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.Help, {}, 0).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.Help, {}, 0).push()
  }
  
  
}