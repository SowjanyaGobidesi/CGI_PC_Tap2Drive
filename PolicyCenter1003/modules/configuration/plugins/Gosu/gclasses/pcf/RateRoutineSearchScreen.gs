package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($initialRateRoutine :  CalcRoutineDefinition, $displayImportResults :  boolean) : void {
    __widgetOf(this, pcf.RateRoutineSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$initialRateRoutine, $displayImportResults})
  }
  
  function refreshVariables ($initialRateRoutine :  CalcRoutineDefinition, $displayImportResults :  boolean) : void {
    __widgetOf(this, pcf.RateRoutineSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$initialRateRoutine, $displayImportResults})
  }
  
  
}