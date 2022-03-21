package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/messaging/MessagePayloadPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MessagePayloadPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (MessageId :  long) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MessagePayloadPopup, {MessageId}, 0)
  }
  
  static function push (MessageId :  long) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MessagePayloadPopup, {MessageId}, 0).push()
  }
  
  
}