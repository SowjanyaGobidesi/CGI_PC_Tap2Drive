package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewrite/RewriteWizard_DifferencesScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteWizard_DifferencesScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteWizard_DifferencesScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteWizard_DifferencesScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $jobWizardHelper})
  }
  
  
}