package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/rewritenewaccount/RewriteNewAccountWizard_ReviewSummaryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RewriteNewAccountWizard_ReviewSummaryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $rewriteNewAccount :  RewriteNewAccount) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_ReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $rewriteNewAccount})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $rewriteNewAccount :  RewriteNewAccount) : void {
    __widgetOf(this, pcf.RewriteNewAccountWizard_ReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $rewriteNewAccount})
  }
  
  
}