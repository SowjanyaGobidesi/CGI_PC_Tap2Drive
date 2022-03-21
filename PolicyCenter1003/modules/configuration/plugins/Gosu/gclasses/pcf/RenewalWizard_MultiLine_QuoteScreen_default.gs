package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/RenewalWizard_MultiLine_QuoteScreen.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalWizard_MultiLine_QuoteScreen_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($renewal :  Renewal, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RenewalWizard_MultiLine_QuoteScreen_default, SECTION_WIDGET_CLASS).setVariables(false, {$renewal, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($renewal :  Renewal, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RenewalWizard_MultiLine_QuoteScreen_default, SECTION_WIDGET_CLASS).setVariables(true, {$renewal, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}