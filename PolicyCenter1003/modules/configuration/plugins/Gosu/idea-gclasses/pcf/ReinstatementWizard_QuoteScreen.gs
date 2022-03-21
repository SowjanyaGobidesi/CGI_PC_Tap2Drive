package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatementWizard_QuoteScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatementWizard_QuoteScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(false, {$reinstatement, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(true, {$reinstatement, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}