package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/ScheduleInputSet.false.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScheduleInputSet_false extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($clause :  gw.api.domain.Clause, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.ScheduleInputSet_false, SECTION_WIDGET_CLASS).setVariables(false, {$clause, $openForEdit})
  }
  
  function refreshVariables ($clause :  gw.api.domain.Clause, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.ScheduleInputSet_false, SECTION_WIDGET_CLASS).setVariables(true, {$clause, $openForEdit})
  }
  
  
}