package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/outboundfile/OutboundRecordPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OutboundRecordPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (bean :  OutboundRecord) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OutboundRecordPopup, {bean}, 0)
  }
  
  static function push (bean :  OutboundRecord) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OutboundRecordPopup, {bean}, 0).push()
  }
  
  
}