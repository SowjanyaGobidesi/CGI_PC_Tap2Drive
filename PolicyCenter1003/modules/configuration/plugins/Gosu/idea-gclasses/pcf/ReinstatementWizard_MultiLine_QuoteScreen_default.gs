package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatementWizard_MultiLine_QuoteScreen.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatementWizard_MultiLine_QuoteScreen_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_MultiLine_QuoteScreen_default, SECTION_WIDGET_CLASS).setVariables(false, {$reinstatement, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_MultiLine_QuoteScreen_default, SECTION_WIDGET_CLASS).setVariables(true, {$reinstatement, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}