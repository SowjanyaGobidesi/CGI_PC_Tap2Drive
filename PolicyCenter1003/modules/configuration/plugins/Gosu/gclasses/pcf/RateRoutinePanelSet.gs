package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutinePanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutinePanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($allRateRoutines :  gw.api.database.IQueryBeanResult<entity.CalcRoutineDefinition>, $initialRateRoutine :  CalcRoutineDefinition) : void {
    __widgetOf(this, pcf.RateRoutinePanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$allRateRoutines, $initialRateRoutine})
  }
  
  function refreshVariables ($allRateRoutines :  gw.api.database.IQueryBeanResult<entity.CalcRoutineDefinition>, $initialRateRoutine :  CalcRoutineDefinition) : void {
    __widgetOf(this, pcf.RateRoutinePanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$allRateRoutines, $initialRateRoutine})
  }
  
  
}