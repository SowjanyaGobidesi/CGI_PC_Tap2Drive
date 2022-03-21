package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard_PolicyInfoScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard_PolicyInfoScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $rewriteNewAccount :  RewriteNewAccount, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(false, {$period, $rewriteNewAccount, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $rewriteNewAccount :  RewriteNewAccount, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PolicyInfoScreen, SECTION_WIDGET_CLASS).setVariables(true, {$period, $rewriteNewAccount, $openForEdit, $jobWizardHelper})
  }
  
  
}