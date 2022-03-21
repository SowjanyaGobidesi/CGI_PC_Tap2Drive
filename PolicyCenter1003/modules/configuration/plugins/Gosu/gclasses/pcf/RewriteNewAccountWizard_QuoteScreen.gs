package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard_QuoteScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard_QuoteScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}