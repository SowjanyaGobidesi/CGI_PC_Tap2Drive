package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineOperandVariableMenuItemSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineOperandVariableMenuItemSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($operand :  CalcStepDefinitionOperand) : void {
    __widgetOf(this, pcf.RateRoutineOperandVariableMenuItemSet, SECTION_WIDGET_CLASS).setVariables(false, {$operand})
  }
  
  function refreshVariables ($operand :  CalcStepDefinitionOperand) : void {
    __widgetOf(this, pcf.RateRoutineOperandVariableMenuItemSet, SECTION_WIDGET_CLASS).setVariables(true, {$operand})
  }
  
  
}