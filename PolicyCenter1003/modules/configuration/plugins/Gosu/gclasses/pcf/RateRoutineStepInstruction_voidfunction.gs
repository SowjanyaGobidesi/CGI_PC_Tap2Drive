package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineStepInstruction.voidfunction.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineStepInstruction_voidfunction extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($step :  entity.CalcStepDefinition, $helper :  gw.pcf.rating.flow.RateRoutineEditScreenHelper, $indentLevelMap :  java.util.HashMap<CalcStepDefinition, java.lang.Integer>) : void {
    __widgetOf(this, pcf.RateRoutineStepInstruction_voidfunction, SECTION_WIDGET_CLASS).setVariables(false, {$step, $helper, $indentLevelMap})
  }
  
  function refreshVariables ($step :  entity.CalcStepDefinition, $helper :  gw.pcf.rating.flow.RateRoutineEditScreenHelper, $indentLevelMap :  java.util.HashMap<CalcStepDefinition, java.lang.Integer>) : void {
    __widgetOf(this, pcf.RateRoutineStepInstruction_voidfunction, SECTION_WIDGET_CLASS).setVariables(true, {$step, $helper, $indentLevelMap})
  }
  
  
}