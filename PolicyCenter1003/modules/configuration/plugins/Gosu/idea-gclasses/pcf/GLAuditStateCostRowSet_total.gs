package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/GLAuditStateCostRowSet.total.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GLAuditStateCostRowSet_total extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($auditCostWrapper :  gw.api.ui.AuditCostWrapper) : void {
    __widgetOf(this, pcf.GLAuditStateCostRowSet_total, SECTION_WIDGET_CLASS).setVariables(false, {$auditCostWrapper})
  }
  
  function refreshVariables ($auditCostWrapper :  gw.api.ui.AuditCostWrapper) : void {
    __widgetOf(this, pcf.GLAuditStateCostRowSet_total, SECTION_WIDGET_CLASS).setVariables(true, {$auditCostWrapper})
  }
  
  
}