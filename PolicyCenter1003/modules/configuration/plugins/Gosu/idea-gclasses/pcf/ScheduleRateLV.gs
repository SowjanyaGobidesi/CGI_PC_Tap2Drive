package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/ScheduleRateLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScheduleRateLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($credit :  Modifier) : void {
    __widgetOf(this, pcf.ScheduleRateLV, SECTION_WIDGET_CLASS).setVariables(false, {$credit})
  }
  
  function refreshVariables ($credit :  Modifier) : void {
    __widgetOf(this, pcf.ScheduleRateLV, SECTION_WIDGET_CLASS).setVariables(true, {$credit})
  }
  
  
}