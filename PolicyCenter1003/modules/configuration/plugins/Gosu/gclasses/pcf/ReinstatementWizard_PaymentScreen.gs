package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatementWizard_PaymentScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatementWizard_PaymentScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.ReinstatementWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(false, {$reinstatement, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.ReinstatementWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(true, {$reinstatement, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  
}