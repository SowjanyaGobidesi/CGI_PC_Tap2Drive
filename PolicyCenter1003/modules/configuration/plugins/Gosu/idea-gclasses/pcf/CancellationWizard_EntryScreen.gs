package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/cancellation/CancellationWizard_EntryScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CancellationWizard_EntryScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $cancellation :  Cancellation, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CancellationWizard_EntryScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $cancellation, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $cancellation :  Cancellation, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CancellationWizard_EntryScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $cancellation, $openForEdit, $jobWizardHelper})
  }
  
  
}