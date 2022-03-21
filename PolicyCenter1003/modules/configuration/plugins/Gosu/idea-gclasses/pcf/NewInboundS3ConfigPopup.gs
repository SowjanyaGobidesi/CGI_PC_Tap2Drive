package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/inbound/NewInboundS3ConfigPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewInboundS3ConfigPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewInboundS3ConfigPopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewInboundS3ConfigPopup, {}, 0).push()
  }
  
  
}