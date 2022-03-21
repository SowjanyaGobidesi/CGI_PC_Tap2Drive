package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard_PolicyReviewScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard_PolicyReviewScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rewriteNewAccount :  RewriteNewAccount, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PolicyReviewScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rewriteNewAccount, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($rewriteNewAccount :  RewriteNewAccount, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PolicyReviewScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rewriteNewAccount, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}