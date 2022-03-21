package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineEntityPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineEntityPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (valueDelegate :  CalcStepValueDelegate, calcStep :  CalcStepDefinition) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineEntityPopup, {valueDelegate, calcStep}, 0)
  }
  
  static function createDestination (valueDelegate :  CalcStepValueDelegate, calcStep :  CalcStepDefinition, restrictToTargetDataTypes :  java.util.Set<gw.lang.reflect.IType>, selectedEntity :  CalcRoutineParamName) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineEntityPopup, {valueDelegate, calcStep, restrictToTargetDataTypes, selectedEntity}, 1)
  }
  
  static function push (valueDelegate :  CalcStepValueDelegate, calcStep :  CalcStepDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineEntityPopup, {valueDelegate, calcStep}, 0).push()
  }
  
  static function push (valueDelegate :  CalcStepValueDelegate, calcStep :  CalcStepDefinition, restrictToTargetDataTypes :  java.util.Set<gw.lang.reflect.IType>, selectedEntity :  CalcRoutineParamName) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineEntityPopup, {valueDelegate, calcStep, restrictToTargetDataTypes, selectedEntity}, 1).push()
  }
  
  
}