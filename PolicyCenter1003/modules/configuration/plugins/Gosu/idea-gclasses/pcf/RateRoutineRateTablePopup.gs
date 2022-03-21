package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineRateTablePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineRateTablePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (operand :  CalcStepDefinitionOperand, routine :  CalcRoutineDefinition, paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, java.util.List<gw.rating.flow.util.InScopeUsage>>, targetDataTypes :  java.util.Set<gw.lang.reflect.IType>) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineRateTablePopup, {operand, routine, paramInScopeUsageMap, targetDataTypes}, 0)
  }
  
  static function push (operand :  CalcStepDefinitionOperand, routine :  CalcRoutineDefinition, paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, java.util.List<gw.rating.flow.util.InScopeUsage>>, targetDataTypes :  java.util.Set<gw.lang.reflect.IType>) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineRateTablePopup, {operand, routine, paramInScopeUsageMap, targetDataTypes}, 0).push()
  }
  
  
}