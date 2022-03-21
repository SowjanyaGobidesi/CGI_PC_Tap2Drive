package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/GLAuditStateCostRowSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GLAuditStateCostRowSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($auditCostWrapper :  gw.api.ui.AuditCostWrapper) : void {
    __widgetOf(this, pcf.GLAuditStateCostRowSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$auditCostWrapper})
  }
  
  function refreshVariables ($auditCostWrapper :  gw.api.ui.AuditCostWrapper) : void {
    __widgetOf(this, pcf.GLAuditStateCostRowSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$auditCostWrapper})
  }
  
  
}