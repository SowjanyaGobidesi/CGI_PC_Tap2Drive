package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/MultiQuoteAcceleratedMenuActions.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MultiQuoteAcceleratedMenuActions extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.MultiQuoteAcceleratedMenuActions, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod, $jobWizardHelper})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.MultiQuoteAcceleratedMenuActions, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod, $jobWizardHelper})
  }
  
  
}