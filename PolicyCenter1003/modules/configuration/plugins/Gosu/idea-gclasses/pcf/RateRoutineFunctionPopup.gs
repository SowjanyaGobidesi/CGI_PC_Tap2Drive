package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineFunctionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineFunctionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (operand :  CalcStepDefinitionOperand) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineFunctionPopup, {operand}, 0)
  }
  
  static function createDestination (operand :  CalcStepDefinitionOperand, targetDataTypes :  java.util.Set<gw.lang.reflect.IType>) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineFunctionPopup, {operand, targetDataTypes}, 1)
  }
  
  static function createDestination (operand :  CalcStepDefinitionOperand, targetDataTypes :  java.util.Set<gw.lang.reflect.IType>, paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, java.util.List<gw.rating.flow.util.InScopeUsage>>) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineFunctionPopup, {operand, targetDataTypes, paramInScopeUsageMap}, 2)
  }
  
  static function push (operand :  CalcStepDefinitionOperand) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineFunctionPopup, {operand}, 0).push()
  }
  
  static function push (operand :  CalcStepDefinitionOperand, targetDataTypes :  java.util.Set<gw.lang.reflect.IType>) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineFunctionPopup, {operand, targetDataTypes}, 1).push()
  }
  
  static function push (operand :  CalcStepDefinitionOperand, targetDataTypes :  java.util.Set<gw.lang.reflect.IType>, paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, java.util.List<gw.rating.flow.util.InScopeUsage>>) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineFunctionPopup, {operand, targetDataTypes, paramInScopeUsageMap}, 2).push()
  }
  
  
}