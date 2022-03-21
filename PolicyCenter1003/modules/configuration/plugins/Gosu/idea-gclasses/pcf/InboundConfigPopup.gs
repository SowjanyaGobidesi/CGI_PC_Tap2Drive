package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/inbound/InboundConfigPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InboundConfigPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.InboundConfigPopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.InboundConfigPopup, {}, 0).push()
  }
  
  
}