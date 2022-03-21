package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditPremiumDetailsPanelSet.WorkersCompLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditPremiumDetailsPanelSet_WorkersCompLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($auditInfo :  AuditInformation, $period :  PolicyPeriod, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.AuditPremiumDetailsPanelSet_WorkersCompLine, SECTION_WIDGET_CLASS).setVariables(false, {$auditInfo, $period, $isEditable})
  }
  
  function refreshVariables ($auditInfo :  AuditInformation, $period :  PolicyPeriod, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.AuditPremiumDetailsPanelSet_WorkersCompLine, SECTION_WIDGET_CLASS).setVariables(true, {$auditInfo, $period, $isEditable})
  }
  
  
}