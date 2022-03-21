package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowsInputSet.PolicyPeriodWorkflow.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowsInputSet_PolicyPeriodWorkflow extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  WorkflowSearchCriteria) : void {
    __widgetOf(this, pcf.WorkflowsInputSet_PolicyPeriodWorkflow, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  WorkflowSearchCriteria) : void {
    __widgetOf(this, pcf.WorkflowsInputSet_PolicyPeriodWorkflow, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}