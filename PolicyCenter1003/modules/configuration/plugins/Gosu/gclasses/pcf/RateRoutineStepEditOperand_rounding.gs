package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineStepEditOperand.rounding.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineStepEditOperand_rounding extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($ratingRoutineStep :  CalcStepDefinition, $rateRoutine :  CalcRoutineDefinition, $inScopeParamInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, $orderedSteps :  List<CalcStepDefinition>) : void {
    __widgetOf(this, pcf.RateRoutineStepEditOperand_rounding, SECTION_WIDGET_CLASS).setVariables(false, {$ratingRoutineStep, $rateRoutine, $inScopeParamInScopeUsageMap, $costDataUsages, $orderedSteps})
  }
  
  function refreshVariables ($ratingRoutineStep :  CalcStepDefinition, $rateRoutine :  CalcRoutineDefinition, $inScopeParamInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, $orderedSteps :  List<CalcStepDefinition>) : void {
    __widgetOf(this, pcf.RateRoutineStepEditOperand_rounding, SECTION_WIDGET_CLASS).setVariables(true, {$ratingRoutineStep, $rateRoutine, $inScopeParamInScopeUsageMap, $costDataUsages, $orderedSteps})
  }
  
  
}