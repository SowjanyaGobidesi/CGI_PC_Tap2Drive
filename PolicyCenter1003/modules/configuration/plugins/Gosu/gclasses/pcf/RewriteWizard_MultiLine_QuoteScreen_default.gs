package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewrite/RewriteWizard_MultiLine_QuoteScreen.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteWizard_MultiLine_QuoteScreen_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteWizard_MultiLine_QuoteScreen_default, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteWizard_MultiLine_QuoteScreen_default, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}