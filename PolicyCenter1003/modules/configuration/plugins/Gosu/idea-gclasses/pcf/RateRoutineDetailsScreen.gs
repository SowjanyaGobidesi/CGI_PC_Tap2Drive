package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineDetailsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineDetailsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rateRoutine :  CalcRoutineDefinition, $rateBook :  RateBook) : void {
    __widgetOf(this, pcf.RateRoutineDetailsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rateRoutine, $rateBook})
  }
  
  function refreshVariables ($rateRoutine :  CalcRoutineDefinition, $rateBook :  RateBook) : void {
    __widgetOf(this, pcf.RateRoutineDetailsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rateRoutine, $rateBook})
  }
  
  
}