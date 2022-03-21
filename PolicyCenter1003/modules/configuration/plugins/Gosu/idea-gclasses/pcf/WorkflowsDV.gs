package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  WorkflowSearchCriteria) : void {
    __widgetOf(this, pcf.WorkflowsDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  WorkflowSearchCriteria) : void {
    __widgetOf(this, pcf.WorkflowsDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}