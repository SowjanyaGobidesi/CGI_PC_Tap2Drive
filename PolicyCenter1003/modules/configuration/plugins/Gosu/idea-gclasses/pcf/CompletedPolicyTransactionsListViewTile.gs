package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/CompletedPolicyTransactionsListViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CompletedPolicyTransactionsListViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $asOfDate :  Date) : void {
    __widgetOf(this, pcf.CompletedPolicyTransactionsListViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $asOfDate})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $asOfDate :  Date) : void {
    __widgetOf(this, pcf.CompletedPolicyTransactionsListViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $asOfDate})
  }
  
  
}