package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AssignableQueueDetailDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AssignableQueueDetailDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($assignableQueue :  AssignableQueue) : void {
    __widgetOf(this, pcf.AssignableQueueDetailDV, SECTION_WIDGET_CLASS).setVariables(false, {$assignableQueue})
  }
  
  function refreshVariables ($assignableQueue :  AssignableQueue) : void {
    __widgetOf(this, pcf.AssignableQueueDetailDV, SECTION_WIDGET_CLASS).setVariables(true, {$assignableQueue})
  }
  
  
}