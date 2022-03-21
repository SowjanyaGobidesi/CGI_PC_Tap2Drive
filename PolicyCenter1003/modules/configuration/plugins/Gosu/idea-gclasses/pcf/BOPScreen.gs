package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BOPScreen, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BOPScreen, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}