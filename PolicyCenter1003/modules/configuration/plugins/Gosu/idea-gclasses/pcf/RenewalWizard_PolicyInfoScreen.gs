package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/RenewalWizard_PolicyInfoScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RenewalWizard_PolicyInfoScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($renewal :  Renewal, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RenewalWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(false, {$renewal, $period, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($renewal :  Renewal, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RenewalWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(true, {$renewal, $period, $openForEdit, $jobWizardHelper})
  }
  
  
}