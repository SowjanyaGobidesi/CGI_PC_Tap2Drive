package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rateroutine :  CalcRoutineDefinition, $newRateRoutine :  boolean, $copyVersionType :  gw.rating.flow.util.CopyVersionType, $highlightedRows :  java.util.Map<CalcStepDefinition, java.util.List<java.lang.Integer>>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>) : void {
    __widgetOf(this, pcf.RateRoutineDV, SECTION_WIDGET_CLASS).setVariables(false, {$rateroutine, $newRateRoutine, $copyVersionType, $highlightedRows, $costDataUsages})
  }
  
  function refreshVariables ($rateroutine :  CalcRoutineDefinition, $newRateRoutine :  boolean, $copyVersionType :  gw.rating.flow.util.CopyVersionType, $highlightedRows :  java.util.Map<CalcStepDefinition, java.util.List<java.lang.Integer>>, $costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>) : void {
    __widgetOf(this, pcf.RateRoutineDV, SECTION_WIDGET_CLASS).setVariables(true, {$rateroutine, $newRateRoutine, $copyVersionType, $highlightedRows, $costDataUsages})
  }
  
  
}