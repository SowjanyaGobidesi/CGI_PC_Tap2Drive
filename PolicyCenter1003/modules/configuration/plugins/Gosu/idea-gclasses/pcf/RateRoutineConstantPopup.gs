package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineConstantPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineConstantPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (arg :  CalcStepDefinitionArgument) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineConstantPopup, {arg}, 0)
  }
  
  static function push (arg :  CalcStepDefinitionArgument) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineConstantPopup, {arg}, 0).push()
  }
  
  
}