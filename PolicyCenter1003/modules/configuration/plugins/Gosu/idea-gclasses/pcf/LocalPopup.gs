package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/LocalPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocalPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (eTFs :  String[][]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LocalPopup, {eTFs}, 0)
  }
  
  static function push (eTFs :  String[][]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LocalPopup, {eTFs}, 0).push()
  }
  
  
}