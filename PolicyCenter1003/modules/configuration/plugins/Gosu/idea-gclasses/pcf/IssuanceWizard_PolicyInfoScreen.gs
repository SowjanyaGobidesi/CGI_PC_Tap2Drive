package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/issuance/IssuanceWizard_PolicyInfoScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IssuanceWizard_PolicyInfoScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($issuance :  Issuance, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IssuanceWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(false, {$issuance, $period, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($issuance :  Issuance, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IssuanceWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(true, {$issuance, $period, $openForEdit, $jobWizardHelper})
  }
  
  
}