package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/WorkflowsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WorkflowsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($workflows :  gw.api.database.IQueryBeanResult<Workflow>, $isParent :  boolean) : void {
    __widgetOf(this, pcf.WorkflowsLV, SECTION_WIDGET_CLASS).setVariables(false, {$workflows, $isParent})
  }
  
  function refreshVariables ($workflows :  gw.api.database.IQueryBeanResult<Workflow>, $isParent :  boolean) : void {
    __widgetOf(this, pcf.WorkflowsLV, SECTION_WIDGET_CLASS).setVariables(true, {$workflows, $isParent})
  }
  
  
}