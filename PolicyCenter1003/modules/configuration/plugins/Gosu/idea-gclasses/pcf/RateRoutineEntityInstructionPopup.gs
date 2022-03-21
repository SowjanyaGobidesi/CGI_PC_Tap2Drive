package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineEntityInstructionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineEntityInstructionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (calcStep :  CalcStepDefinition) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineEntityInstructionPopup, {calcStep}, 0)
  }
  
  static function createDestination (calcStep :  CalcStepDefinition, restrictToTargetDataTypes :  java.util.Set<gw.lang.reflect.IType>, selectedEntity :  CalcRoutineParamName) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineEntityInstructionPopup, {calcStep, restrictToTargetDataTypes, selectedEntity}, 1)
  }
  
  static function push (calcStep :  CalcStepDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineEntityInstructionPopup, {calcStep}, 0).push()
  }
  
  static function push (calcStep :  CalcStepDefinition, restrictToTargetDataTypes :  java.util.Set<gw.lang.reflect.IType>, selectedEntity :  CalcRoutineParamName) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineEntityInstructionPopup, {calcStep, restrictToTargetDataTypes, selectedEntity}, 1).push()
  }
  
  
}