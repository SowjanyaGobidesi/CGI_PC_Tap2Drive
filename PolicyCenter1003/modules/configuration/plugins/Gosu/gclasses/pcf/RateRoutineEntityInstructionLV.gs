package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineEntityInstructionLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineEntityInstructionLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($calcStep :  CalcStepDefinition, $inScopeUsages :  gw.rating.flow.util.InScopeUsage[], $helper :  gw.pcf.rating.flow.RateRoutineEntityInstructionPopupHelper) : void {
    __widgetOf(this, pcf.RateRoutineEntityInstructionLV, SECTION_WIDGET_CLASS).setVariables(false, {$calcStep, $inScopeUsages, $helper})
  }
  
  function refreshVariables ($calcStep :  CalcStepDefinition, $inScopeUsages :  gw.rating.flow.util.InScopeUsage[], $helper :  gw.pcf.rating.flow.RateRoutineEntityInstructionPopupHelper) : void {
    __widgetOf(this, pcf.RateRoutineEntityInstructionLV, SECTION_WIDGET_CLASS).setVariables(true, {$calcStep, $inScopeUsages, $helper})
  }
  
  
}