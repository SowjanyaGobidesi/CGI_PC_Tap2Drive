package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditInformationScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditInformationScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.AuditInformationScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.AuditInformationScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}