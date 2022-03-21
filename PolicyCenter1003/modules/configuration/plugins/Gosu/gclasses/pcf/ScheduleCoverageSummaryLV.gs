package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/schedule/ScheduleCoverageSummaryLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScheduleCoverageSummaryLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($schedules :  List<gw.api.domain.Schedule>) : void {
    __widgetOf(this, pcf.ScheduleCoverageSummaryLV, SECTION_WIDGET_CLASS).setVariables(false, {$schedules})
  }
  
  function refreshVariables ($schedules :  List<gw.api.domain.Schedule>) : void {
    __widgetOf(this, pcf.ScheduleCoverageSummaryLV, SECTION_WIDGET_CLASS).setVariables(true, {$schedules})
  }
  
  
}