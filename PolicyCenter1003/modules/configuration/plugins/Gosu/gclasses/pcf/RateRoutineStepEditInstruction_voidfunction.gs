package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineStepEditInstruction.voidfunction.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineStepEditInstruction_voidfunction extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($step :  entity.CalcStepDefinition, $helper :  gw.pcf.rating.flow.RateRoutineEditScreenHelper, $indentLevelMap :  java.util.HashMap<CalcStepDefinition, java.lang.Integer>, $writableParamUsages :  java.util.Map<CalcRoutineParameter, java.util.List<gw.rating.flow.util.InScopeUsage>>, $writableParams :  List<CalcRoutineParameter>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>) : void {
    __widgetOf(this, pcf.RateRoutineStepEditInstruction_voidfunction, SECTION_WIDGET_CLASS).setVariables(false, {$step, $helper, $indentLevelMap, $writableParamUsages, $writableParams, $costDataUsages})
  }
  
  function refreshVariables ($step :  entity.CalcStepDefinition, $helper :  gw.pcf.rating.flow.RateRoutineEditScreenHelper, $indentLevelMap :  java.util.HashMap<CalcStepDefinition, java.lang.Integer>, $writableParamUsages :  java.util.Map<CalcRoutineParameter, java.util.List<gw.rating.flow.util.InScopeUsage>>, $writableParams :  List<CalcRoutineParameter>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>) : void {
    __widgetOf(this, pcf.RateRoutineStepEditInstruction_voidfunction, SECTION_WIDGET_CLASS).setVariables(true, {$step, $helper, $indentLevelMap, $writableParamUsages, $writableParams, $costDataUsages})
  }
  
  
}