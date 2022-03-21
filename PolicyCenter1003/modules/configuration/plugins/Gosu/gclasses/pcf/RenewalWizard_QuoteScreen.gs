package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/RenewalWizard_QuoteScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalWizard_QuoteScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($renewal :  Renewal, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RenewalWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(false, {$renewal, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($renewal :  Renewal, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RenewalWizard_QuoteScreen, SECTION_WIDGET_CLASS).setVariables(true, {$renewal, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}