package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/job/LineWizardStepSet.BusinessOwners.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LineWizardStepSet_BusinessOwners extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LineWizardStepSet_BusinessOwners, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod, $jobWizardHelper, $openForEdit})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LineWizardStepSet_BusinessOwners, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod, $jobWizardHelper, $openForEdit})
  }
  
  
}