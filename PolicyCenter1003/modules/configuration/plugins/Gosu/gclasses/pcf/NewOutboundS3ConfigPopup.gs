package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/outboundfile/NewOutboundS3ConfigPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewOutboundS3ConfigPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewOutboundS3ConfigPopup, {}, 1)
  }
  
  static function createDestination (outboundFileConfig :  OutboundFileS3Config) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewOutboundS3ConfigPopup, {outboundFileConfig}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewOutboundS3ConfigPopup, {}, 1).push()
  }
  
  static function push (outboundFileConfig :  OutboundFileS3Config) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewOutboundS3ConfigPopup, {outboundFileConfig}, 0).push()
  }
  
  
}