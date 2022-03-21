package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/ContextHelp.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContextHelp extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContextHelp, {}, 0)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContextHelp, {}, 0).drilldown()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContextHelp, {}, 0).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContextHelp, {}, 0).push()
  }
  
  
}