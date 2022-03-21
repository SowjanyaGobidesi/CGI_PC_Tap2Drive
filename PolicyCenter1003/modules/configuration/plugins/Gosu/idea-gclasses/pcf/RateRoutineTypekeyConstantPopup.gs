package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineTypekeyConstantPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineTypekeyConstantPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (valueDelegate :  CalcStepValueDelegate) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineTypekeyConstantPopup, {valueDelegate}, 0)
  }
  
  static function createDestination (valueDelegate :  CalcStepValueDelegate, preSelectedTypeKey :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineTypekeyConstantPopup, {valueDelegate, preSelectedTypeKey}, 1)
  }
  
  static function push (valueDelegate :  CalcStepValueDelegate) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineTypekeyConstantPopup, {valueDelegate}, 0).push()
  }
  
  static function push (valueDelegate :  CalcStepValueDelegate, preSelectedTypeKey :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineTypekeyConstantPopup, {valueDelegate, preSelectedTypeKey}, 1).push()
  }
  
  
}