package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/exitpoints/MulticlusterContact.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterContact extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (shardUrl :  String, contactPublicId :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterContact, {shardUrl, contactPublicId}, 0)
  }
  
  static function drilldown (shardUrl :  String, contactPublicId :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterContact, {shardUrl, contactPublicId}, 0).drilldown()
  }
  
  static function printPage (shardUrl :  String, contactPublicId :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterContact, {shardUrl, contactPublicId}, 0).printPage()
  }
  
  static function push (shardUrl :  String, contactPublicId :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterContact, {shardUrl, contactPublicId}, 0).push()
  }
  
  
}