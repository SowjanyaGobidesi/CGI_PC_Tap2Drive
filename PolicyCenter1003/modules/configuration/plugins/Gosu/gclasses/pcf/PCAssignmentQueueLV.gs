package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/PCAssignmentQueueLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PCAssignmentQueueLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($queues :  gw.api.database.IQueryBeanResult<AssignableQueue>) : void {
    __widgetOf(this, pcf.PCAssignmentQueueLV, SECTION_WIDGET_CLASS).setVariables(false, {$queues})
  }
  
  function refreshVariables ($queues :  gw.api.database.IQueryBeanResult<AssignableQueue>) : void {
    __widgetOf(this, pcf.PCAssignmentQueueLV, SECTION_WIDGET_CLASS).setVariables(true, {$queues})
  }
  
  
}