package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/issuance/IssuanceWizard_PolicyInfoDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IssuanceWizard_PolicyInfoDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $issuance :  Issuance, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.IssuanceWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $issuance, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $issuance :  Issuance, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.IssuanceWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $issuance, $openForEdit})
  }
  
  
}