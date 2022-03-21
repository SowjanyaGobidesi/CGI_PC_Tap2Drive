package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineOperandMenuItemSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineOperandMenuItemSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($operand :  CalcStepDefinitionOperand, $routine :  CalcRoutineDefinition, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $costDataUsages :  List<gw.rating.flow.util.InScopeUsage>, $orderedSteps :  java.util.List<entity.CalcStepDefinition>) : void {
    __widgetOf(this, pcf.RateRoutineOperandMenuItemSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$operand, $routine, $paramInScopeUsageMap, $costDataUsages, $orderedSteps})
  }
  
  function refreshVariables ($operand :  CalcStepDefinitionOperand, $routine :  CalcRoutineDefinition, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $costDataUsages :  List<gw.rating.flow.util.InScopeUsage>, $orderedSteps :  java.util.List<entity.CalcStepDefinition>) : void {
    __widgetOf(this, pcf.RateRoutineOperandMenuItemSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$operand, $routine, $paramInScopeUsageMap, $costDataUsages, $orderedSteps})
  }
  
  
}