package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatementWizard_MultiLine_QuoteScreen.CommercialPackage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatementWizard_MultiLine_QuoteScreen_CommercialPackage extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_MultiLine_QuoteScreen_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(false, {$reinstatement, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  function refreshVariables ($reinstatement :  Reinstatement, $policyPeriod :  PolicyPeriod, $isEditable :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReinstatementWizard_MultiLine_QuoteScreen_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(true, {$reinstatement, $policyPeriod, $isEditable, $jobWizardHelper})
  }
  
  
}