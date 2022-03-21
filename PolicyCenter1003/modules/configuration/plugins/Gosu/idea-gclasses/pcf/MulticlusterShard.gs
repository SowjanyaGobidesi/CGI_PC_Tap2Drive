package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/exitpoints/MulticlusterShard.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterShard extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (shardUrl :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterShard, {shardUrl}, 0)
  }
  
  static function drilldown (shardUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterShard, {shardUrl}, 0).drilldown()
  }
  
  static function printPage (shardUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterShard, {shardUrl}, 0).printPage()
  }
  
  static function push (shardUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterShard, {shardUrl}, 0).push()
  }
  
  
}