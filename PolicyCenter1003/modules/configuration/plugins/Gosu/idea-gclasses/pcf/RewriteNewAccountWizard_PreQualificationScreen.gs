package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard_PreQualificationScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard_PreQualificationScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rewriteNewAccount :  RewriteNewAccount, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PreQualificationScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rewriteNewAccount, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($rewriteNewAccount :  RewriteNewAccount, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PreQualificationScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rewriteNewAccount, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}