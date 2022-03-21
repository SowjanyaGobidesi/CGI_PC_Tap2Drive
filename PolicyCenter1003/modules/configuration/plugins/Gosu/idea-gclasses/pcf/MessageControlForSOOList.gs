package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/messaging/MessageControlForSOOList.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MessageControlForSOOList extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (DestinationId :  int, DestinationName :  String, SOOKeyValue :  long, SOOName :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MessageControlForSOOList, {DestinationId, DestinationName, SOOKeyValue, SOOName}, 0)
  }
  
  static function drilldown (DestinationId :  int, DestinationName :  String, SOOKeyValue :  long, SOOName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForSOOList, {DestinationId, DestinationName, SOOKeyValue, SOOName}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (DestinationId :  int, DestinationName :  String, SOOKeyValue :  long, SOOName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForSOOList, {DestinationId, DestinationName, SOOKeyValue, SOOName}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (DestinationId :  int, DestinationName :  String, SOOKeyValue :  long, SOOName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForSOOList, {DestinationId, DestinationName, SOOKeyValue, SOOName}, 0).goInMain()
  }
  
  static function printPage (DestinationId :  int, DestinationName :  String, SOOKeyValue :  long, SOOName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForSOOList, {DestinationId, DestinationName, SOOKeyValue, SOOName}, 0).printPage()
  }
  
  static function push (DestinationId :  int, DestinationName :  String, SOOKeyValue :  long, SOOName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessageControlForSOOList, {DestinationId, DestinationName, SOOKeyValue, SOOName}, 0).push()
  }
  
  
}