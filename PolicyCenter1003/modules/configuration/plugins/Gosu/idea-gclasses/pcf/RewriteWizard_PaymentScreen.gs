package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewrite/RewriteWizard_PaymentScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteWizard_PaymentScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rewrite :  Rewrite, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.RewriteWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rewrite, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($rewrite :  Rewrite, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.RewriteWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rewrite, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  
}