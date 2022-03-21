package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewrite/RewriteWizard_PolicyInfoScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteWizard_PolicyInfoScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $rewrite :  Rewrite, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(false, {$period, $rewrite, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $rewrite :  Rewrite, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(true, {$period, $rewrite, $openForEdit, $jobWizardHelper})
  }
  
  
}