package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/loadandvacation/LoadFactorsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LoadFactorsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LoadFactorsPopup, {}, 0)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.LoadFactorsPopup, {}, 0).push()
  }
  
  
}