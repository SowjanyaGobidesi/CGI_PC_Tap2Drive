package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatementWizard_ReinstatePolicyScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatementWizard_ReinstatePolicyScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_ReinstatePolicyScreen, SECTION_WIDGET_CLASS).setVariables(false, {$reinstatement, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_ReinstatePolicyScreen, SECTION_WIDGET_CLASS).setVariables(true, {$reinstatement, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}