package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineConditionalPopupFirstOperand.constant.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineConditionalPopupFirstOperand_constant extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($conditionalOperand :  gw.util.Pair<CalcStepDefinitionOperand, CalcStepDefinitionOperand>, $routine :  CalcRoutineDefinition, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, $orderedSteps :  java.util.List<entity.CalcStepDefinition>) : void {
    __widgetOf(this, pcf.RateRoutineConditionalPopupFirstOperand_constant, SECTION_WIDGET_CLASS).setVariables(false, {$conditionalOperand, $routine, $paramInScopeUsageMap, $costDataUsages, $orderedSteps})
  }
  
  function refreshVariables ($conditionalOperand :  gw.util.Pair<CalcStepDefinitionOperand, CalcStepDefinitionOperand>, $routine :  CalcRoutineDefinition, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, $orderedSteps :  java.util.List<entity.CalcStepDefinition>) : void {
    __widgetOf(this, pcf.RateRoutineConditionalPopupFirstOperand_constant, SECTION_WIDGET_CLASS).setVariables(true, {$conditionalOperand, $routine, $paramInScopeUsageMap, $costDataUsages, $orderedSteps})
  }
  
  
}