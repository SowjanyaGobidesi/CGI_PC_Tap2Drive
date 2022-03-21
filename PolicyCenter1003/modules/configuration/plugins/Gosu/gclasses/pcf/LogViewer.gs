package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/LogViewer.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LogViewer extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (log :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LogViewer, {log}, 0)
  }
  
  static function drilldown (log :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LogViewer, {log}, 0).drilldown()
  }
  
  static function printPage (log :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LogViewer, {log}, 0).printPage()
  }
  
  static function push (log :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LogViewer, {log}, 0).push()
  }
  
  
}