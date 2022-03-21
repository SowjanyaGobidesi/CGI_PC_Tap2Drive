package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowDetailInputSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowDetailInputSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($workflowBase :  Workflow) : void {
    __widgetOf(this, pcf.WorkflowDetailInputSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$workflowBase})
  }
  
  function refreshVariables ($workflowBase :  Workflow) : void {
    __widgetOf(this, pcf.WorkflowDetailInputSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$workflowBase})
  }
  
  
}