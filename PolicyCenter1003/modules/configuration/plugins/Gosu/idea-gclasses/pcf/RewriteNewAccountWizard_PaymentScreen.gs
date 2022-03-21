package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard_PaymentScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard_PaymentScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rewriteNewAccount :  RewriteNewAccount, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rewriteNewAccount, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($rewriteNewAccount :  RewriteNewAccount, $policyPeriod :  PolicyPeriod, $editScreen :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PaymentScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rewriteNewAccount, $policyPeriod, $editScreen, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  
}