package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/outboundfile/NewOutboundLocalConfigPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewOutboundLocalConfigPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewOutboundLocalConfigPopup, {}, 1)
  }
  
  static function createDestination (outboundFileConfig :  OutboundFileLocalConfig) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewOutboundLocalConfigPopup, {outboundFileConfig}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewOutboundLocalConfigPopup, {}, 1).push()
  }
  
  static function push (outboundFileConfig :  OutboundFileLocalConfig) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewOutboundLocalConfigPopup, {outboundFileConfig}, 0).push()
  }
  
  
}