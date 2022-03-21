package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowDetailInputSet.PolicyPeriodWorkflow.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowDetailInputSet_PolicyPeriodWorkflow extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($workflowBase :  Workflow) : void {
    __widgetOf(this, pcf.WorkflowDetailInputSet_PolicyPeriodWorkflow, SECTION_WIDGET_CLASS).setVariables(false, {$workflowBase})
  }
  
  function refreshVariables ($workflowBase :  Workflow) : void {
    __widgetOf(this, pcf.WorkflowDetailInputSet_PolicyPeriodWorkflow, SECTION_WIDGET_CLASS).setVariables(true, {$workflowBase})
  }
  
  
}