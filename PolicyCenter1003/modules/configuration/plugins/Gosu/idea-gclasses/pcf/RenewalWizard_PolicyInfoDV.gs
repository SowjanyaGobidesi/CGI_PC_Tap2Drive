package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/RenewalWizard_PolicyInfoDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalWizard_PolicyInfoDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $renewal :  Renewal, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.RenewalWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $renewal, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $renewal :  Renewal, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.RenewalWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $renewal, $openForEdit})
  }
  
  
}