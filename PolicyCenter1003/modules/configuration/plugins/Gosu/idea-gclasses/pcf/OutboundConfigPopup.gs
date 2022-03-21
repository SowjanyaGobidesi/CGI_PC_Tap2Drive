package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/outboundfile/OutboundConfigPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OutboundConfigPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OutboundConfigPopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.OutboundConfigPopup, {}, 0).push()
  }
  
  
}