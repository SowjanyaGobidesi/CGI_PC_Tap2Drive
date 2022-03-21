package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/JobWizardBillingToolbarButtonSet.RewriteNewAccount.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobWizardBillingToolbarButtonSet_RewriteNewAccount extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.JobWizardBillingToolbarButtonSet_RewriteNewAccount, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $job, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.JobWizardBillingToolbarButtonSet_RewriteNewAccount, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $job, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  
}