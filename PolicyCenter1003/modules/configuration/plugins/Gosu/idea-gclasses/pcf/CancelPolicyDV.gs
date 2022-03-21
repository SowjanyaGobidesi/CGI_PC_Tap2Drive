package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/cancellation/CancelPolicyDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CancelPolicyDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($cancellation :  Cancellation, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CancelPolicyDV, SECTION_WIDGET_CLASS).setVariables(false, {$cancellation, $jobWizardHelper})
  }
  
  function refreshVariables ($cancellation :  Cancellation, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CancelPolicyDV, SECTION_WIDGET_CLASS).setVariables(true, {$cancellation, $jobWizardHelper})
  }
  
  
}