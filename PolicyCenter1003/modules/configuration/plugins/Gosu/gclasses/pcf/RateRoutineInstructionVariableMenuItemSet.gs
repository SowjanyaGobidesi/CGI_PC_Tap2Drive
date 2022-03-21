package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineInstructionVariableMenuItemSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineInstructionVariableMenuItemSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($step :  CalcStepDefinition) : void {
    __widgetOf(this, pcf.RateRoutineInstructionVariableMenuItemSet, SECTION_WIDGET_CLASS).setVariables(false, {$step})
  }
  
  function refreshVariables ($step :  CalcStepDefinition) : void {
    __widgetOf(this, pcf.RateRoutineInstructionVariableMenuItemSet, SECTION_WIDGET_CLASS).setVariables(true, {$step})
  }
  
  
}