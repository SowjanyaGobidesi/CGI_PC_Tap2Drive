package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/issuance/IssuanceWizard_QuoteScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IssuanceWizard_QuoteScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($issuance :  Issuance, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IssuanceWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(false, {$issuance, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($issuance :  Issuance, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IssuanceWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(true, {$issuance, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}