package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/issuance/IssuanceWizard_PaymentScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IssuanceWizard_PaymentScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($issuance :  Issuance, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.IssuanceWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(false, {$issuance, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($issuance :  Issuance, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.IssuanceWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(true, {$issuance, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  
}