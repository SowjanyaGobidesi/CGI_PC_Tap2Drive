package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineDateConstantPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineDateConstantPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (valueDelegate :  CalcStepValueDelegate) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineDateConstantPopup, {valueDelegate}, 0)
  }
  
  static function push (valueDelegate :  CalcStepValueDelegate) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDateConstantPopup, {valueDelegate}, 0).push()
  }
  
  
}