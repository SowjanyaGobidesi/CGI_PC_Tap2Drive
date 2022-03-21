package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPCoveragesScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPCoveragesScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.HOPCoveragesScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $job, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $job :  Job, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.HOPCoveragesScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $job, $jobWizardHelper})
  }
  
  
}