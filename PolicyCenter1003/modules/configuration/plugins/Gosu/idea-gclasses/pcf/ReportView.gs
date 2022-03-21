package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/ReportView.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReportView extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (name :  String, subPath :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ReportView, {name, subPath}, 0)
  }
  
  static function drilldown (name :  String, subPath :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ReportView, {name, subPath}, 0).drilldown()
  }
  
  static function printPage (name :  String, subPath :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ReportView, {name, subPath}, 0).printPage()
  }
  
  static function push (name :  String, subPath :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ReportView, {name, subPath}, 0).push()
  }
  
  
}