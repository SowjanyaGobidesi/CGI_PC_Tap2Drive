package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/SubmissionWizard_PolicyInfoScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionWizard_PolicyInfoScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($submission :  Submission, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.SubmissionWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(false, {$submission, $period, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($submission :  Submission, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.SubmissionWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(true, {$submission, $period, $openForEdit, $jobWizardHelper})
  }
  
  
}