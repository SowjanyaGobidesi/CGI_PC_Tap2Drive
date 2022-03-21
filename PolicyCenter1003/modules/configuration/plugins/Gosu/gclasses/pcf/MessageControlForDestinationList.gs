package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/messaging/MessageControlForDestinationList.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MessageControlForDestinationList extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (DestinationId :  int, DestinationName :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MessageControlForDestinationList, {DestinationId, DestinationName}, 0)
  }
  
  static function drilldown (DestinationId :  int, DestinationName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForDestinationList, {DestinationId, DestinationName}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (DestinationId :  int, DestinationName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForDestinationList, {DestinationId, DestinationName}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (DestinationId :  int, DestinationName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForDestinationList, {DestinationId, DestinationName}, 0).goInMain()
  }
  
  static function printPage (DestinationId :  int, DestinationName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForDestinationList, {DestinationId, DestinationName}, 0).printPage()
  }
  
  static function push (DestinationId :  int, DestinationName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForDestinationList, {DestinationId, DestinationName}, 0).push()
  }
  
  
}