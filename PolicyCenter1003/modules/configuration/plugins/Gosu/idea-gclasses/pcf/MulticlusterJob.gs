package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/exitpoints/MulticlusterJob.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterJob extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (shardUrl :  String, jobNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterJob, {shardUrl, jobNumber}, 0)
  }
  
  static function drilldown (shardUrl :  String, jobNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterJob, {shardUrl, jobNumber}, 0).drilldown()
  }
  
  static function printPage (shardUrl :  String, jobNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterJob, {shardUrl, jobNumber}, 0).printPage()
  }
  
  static function push (shardUrl :  String, jobNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterJob, {shardUrl, jobNumber}, 0).push()
  }
  
  
}