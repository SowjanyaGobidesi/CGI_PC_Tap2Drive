package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/workflow/PolicyPeriodWorkflowsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyPeriodWorkflowsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($workflows :  gw.api.database.IQueryBeanResult<Workflow>, $isParent :  boolean) : void {
    __widgetOf(this, pcf.PolicyPeriodWorkflowsLV, SECTION_WIDGET_CLASS).setVariables(false, {$workflows, $isParent})
  }
  
  function refreshVariables ($workflows :  gw.api.database.IQueryBeanResult<Workflow>, $isParent :  boolean) : void {
    __widgetOf(this, pcf.PolicyPeriodWorkflowsLV, SECTION_WIDGET_CLASS).setVariables(true, {$workflows, $isParent})
  }
  
  
}