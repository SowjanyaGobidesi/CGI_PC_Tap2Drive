package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/inbound/NewInboundLocalConfigPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewInboundLocalConfigPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewInboundLocalConfigPopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewInboundLocalConfigPopup, {}, 0).push()
  }
  
  
}