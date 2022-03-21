package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PAQuickSubmission_InfoScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PAQuickSubmission_InfoScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAQuickSubmission_InfoScreen, SECTION_WIDGET_CLASS).setVariables(false, {$job, $period, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($job :  Job, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAQuickSubmission_InfoScreen, SECTION_WIDGET_CLASS).setVariables(true, {$job, $period, $openForEdit, $jobWizardHelper})
  }
  
  
}