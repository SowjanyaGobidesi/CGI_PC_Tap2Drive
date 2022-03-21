package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/RenewalWizard_PaymentScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalWizard_PaymentScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($renewal :  Renewal, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.RenewalWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(false, {$renewal, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($renewal :  Renewal, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.RenewalWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(true, {$renewal, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  
}