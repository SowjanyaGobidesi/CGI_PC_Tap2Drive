package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditPremiumDetailsPanelSet.GLLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditPremiumDetailsPanelSet_GLLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($auditInfo :  AuditInformation, $period :  PolicyPeriod, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.AuditPremiumDetailsPanelSet_GLLine, SECTION_WIDGET_CLASS).setVariables(false, {$auditInfo, $period, $isEditable})
  }
  
  function refreshVariables ($auditInfo :  AuditInformation, $period :  PolicyPeriod, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.AuditPremiumDetailsPanelSet_GLLine, SECTION_WIDGET_CLASS).setVariables(true, {$auditInfo, $period, $isEditable})
  }
  
  
}