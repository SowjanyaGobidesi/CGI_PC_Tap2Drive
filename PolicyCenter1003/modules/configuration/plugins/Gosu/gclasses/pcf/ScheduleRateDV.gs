package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/ScheduleRateDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScheduleRateDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($modifiers :  Modifier[]) : void {
    __widgetOf(this, pcf.ScheduleRateDV, SECTION_WIDGET_CLASS).setVariables(false, {$modifiers})
  }
  
  function refreshVariables ($modifiers :  Modifier[]) : void {
    __widgetOf(this, pcf.ScheduleRateDV, SECTION_WIDGET_CLASS).setVariables(true, {$modifiers})
  }
  
  
}