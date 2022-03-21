package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineInstructionMenuItemSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineInstructionMenuItemSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($step :  CalcStepDefinition, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, $writableParams :  List<CalcRoutineParameter>, $writableParamUsagesMap :  java.util.Map<CalcRoutineParameter, List<gw.rating.flow.util.InScopeUsage>>) : void {
    __widgetOf(this, pcf.RateRoutineInstructionMenuItemSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$step, $costDataUsages, $writableParams, $writableParamUsagesMap})
  }
  
  function refreshVariables ($step :  CalcStepDefinition, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>, $writableParams :  List<CalcRoutineParameter>, $writableParamUsagesMap :  java.util.Map<CalcRoutineParameter, List<gw.rating.flow.util.InScopeUsage>>) : void {
    __widgetOf(this, pcf.RateRoutineInstructionMenuItemSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$step, $costDataUsages, $writableParams, $writableParamUsagesMap})
  }
  
  
}