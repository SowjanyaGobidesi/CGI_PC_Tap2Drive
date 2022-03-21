package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/exitpoints/MulticlusterPolicy.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterPolicy extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (shardUrl :  String, policyNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterPolicy, {shardUrl, policyNumber}, 0)
  }
  
  static function drilldown (shardUrl :  String, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterPolicy, {shardUrl, policyNumber}, 0).drilldown()
  }
  
  static function printPage (shardUrl :  String, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterPolicy, {shardUrl, policyNumber}, 0).printPage()
  }
  
  static function push (shardUrl :  String, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterPolicy, {shardUrl, policyNumber}, 0).push()
  }
  
  
}