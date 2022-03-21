package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/issuance/IssuanceWizard_PolicyReviewScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IssuanceWizard_PolicyReviewScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($issuance :  Issuance, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IssuanceWizard_PolicyReviewScreen, SECTION_WIDGET_CLASS).setVariables(false, {$issuance, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($issuance :  Issuance, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IssuanceWizard_PolicyReviewScreen, SECTION_WIDGET_CLASS).setVariables(true, {$issuance, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}