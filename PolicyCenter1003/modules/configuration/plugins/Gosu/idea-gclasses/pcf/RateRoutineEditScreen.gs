package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineEditScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineEditScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rateRoutine :  CalcRoutineDefinition, $newRateRoutine :  boolean, $copyVersionTyp :  gw.rating.flow.util.CopyVersionType) : void {
    __widgetOf(this, pcf.RateRoutineEditScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rateRoutine, $newRateRoutine, $copyVersionTyp})
  }
  
  function refreshVariables ($rateRoutine :  CalcRoutineDefinition, $newRateRoutine :  boolean, $copyVersionTyp :  gw.rating.flow.util.CopyVersionType) : void {
    __widgetOf(this, pcf.RateRoutineEditScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rateRoutine, $newRateRoutine, $copyVersionTyp})
  }
  
  
}