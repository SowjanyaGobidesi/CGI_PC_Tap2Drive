package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/JobWizardBillingToolbarButtonSet.Submission.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobWizardBillingToolbarButtonSet_Submission extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.JobWizardBillingToolbarButtonSet_Submission, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $job, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.JobWizardBillingToolbarButtonSet_Submission, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $job, $jobWizardHelper, $policyPeriodBillingInstructionsManager})
  }
  
  
}