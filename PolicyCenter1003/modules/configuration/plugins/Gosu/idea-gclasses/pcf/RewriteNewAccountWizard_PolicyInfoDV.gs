package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard_PolicyInfoDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard_PolicyInfoDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $rewriteNewAccount :  RewriteNewAccount, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $rewriteNewAccount, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $rewriteNewAccount :  RewriteNewAccount, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $rewriteNewAccount, $openForEdit})
  }
  
  
}