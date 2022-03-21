package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/JobWizardToolbarButtonSet.Audit.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobWizardToolbarButtonSet_Audit extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.JobWizardToolbarButtonSet_Audit, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $job, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.JobWizardToolbarButtonSet_Audit, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $job, $jobWizardHelper})
  }
  
  
}