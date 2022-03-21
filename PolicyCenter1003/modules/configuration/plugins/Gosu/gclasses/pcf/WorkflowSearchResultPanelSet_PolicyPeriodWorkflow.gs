package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowSearchResultPanelSet.PolicyPeriodWorkflow.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowSearchResultPanelSet_PolicyPeriodWorkflow extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($workflows :  gw.api.database.IQueryBeanResult<Workflow>, $searchCriteria :  WorkflowSearchCriteria) : void {
    __widgetOf(this, pcf.WorkflowSearchResultPanelSet_PolicyPeriodWorkflow, SECTION_WIDGET_CLASS).setVariables(false, {$workflows, $searchCriteria})
  }
  
  function refreshVariables ($workflows :  gw.api.database.IQueryBeanResult<Workflow>, $searchCriteria :  WorkflowSearchCriteria) : void {
    __widgetOf(this, pcf.WorkflowSearchResultPanelSet_PolicyPeriodWorkflow, SECTION_WIDGET_CLASS).setVariables(true, {$workflows, $searchCriteria})
  }
  
  
}