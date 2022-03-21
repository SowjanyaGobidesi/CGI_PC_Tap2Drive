package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/exitpoints/MulticlusterActivity.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterActivity extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (shardUrl :  String, Activity :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterActivity, {shardUrl, Activity}, 0)
  }
  
  static function drilldown (shardUrl :  String, Activity :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterActivity, {shardUrl, Activity}, 0).drilldown()
  }
  
  static function printPage (shardUrl :  String, Activity :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterActivity, {shardUrl, Activity}, 0).printPage()
  }
  
  static function push (shardUrl :  String, Activity :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterActivity, {shardUrl, Activity}, 0).push()
  }
  
  
}