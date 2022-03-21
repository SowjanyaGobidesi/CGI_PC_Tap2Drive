package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/SubmissionWizard_MultiLine_QuoteScreen.CommercialPackage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionWizard_MultiLine_QuoteScreen_CommercialPackage extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($submission :  Submission, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.SubmissionWizard_MultiLine_QuoteScreen_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(false, {$submission, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($submission :  Submission, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.SubmissionWizard_MultiLine_QuoteScreen_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(true, {$submission, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}