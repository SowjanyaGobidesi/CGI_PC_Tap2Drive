package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/policychange/PolicyChangeWizard_PolicyInfoDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyChangeWizard_PolicyInfoDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyChangeWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyChangeWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}