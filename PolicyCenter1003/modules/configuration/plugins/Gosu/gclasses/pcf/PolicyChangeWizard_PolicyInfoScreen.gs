package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/policychange/PolicyChangeWizard_PolicyInfoScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyChangeWizard_PolicyInfoScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyChange :  PolicyChange, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyChangeWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyChange, $period, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($policyChange :  PolicyChange, $period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyChangeWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyChange, $period, $openForEdit, $jobWizardHelper})
  }
  
  
}