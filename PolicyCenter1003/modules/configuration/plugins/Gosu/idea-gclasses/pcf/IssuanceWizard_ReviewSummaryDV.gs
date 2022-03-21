package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/issuance/IssuanceWizard_ReviewSummaryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IssuanceWizard_ReviewSummaryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $issuance :  Issuance) : void {
    __widgetOf(this, pcf.IssuanceWizard_ReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $issuance})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $issuance :  Issuance) : void {
    __widgetOf(this, pcf.IssuanceWizard_ReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $issuance})
  }
  
  
}