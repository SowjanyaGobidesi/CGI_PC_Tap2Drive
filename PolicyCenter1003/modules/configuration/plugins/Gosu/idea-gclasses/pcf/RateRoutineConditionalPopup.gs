package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineConditionalPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineConditionalPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (operand :  CalcStepDefinitionOperand, routine :  CalcRoutineDefinition, paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, java.util.List<gw.rating.flow.util.InScopeUsage>>, costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, orderedSteps :  java.util.List<entity.CalcStepDefinition>) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineConditionalPopup, {operand, routine, paramInScopeUsageMap, costDataUsages, orderedSteps}, 0)
  }
  
  static function push (operand :  CalcStepDefinitionOperand, routine :  CalcRoutineDefinition, paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, java.util.List<gw.rating.flow.util.InScopeUsage>>, costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, orderedSteps :  java.util.List<entity.CalcStepDefinition>) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineConditionalPopup, {operand, routine, paramInScopeUsageMap, costDataUsages, orderedSteps}, 0).push()
  }
  
  
}