package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/PendingPolicyTransactionsListViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PendingPolicyTransactionsListViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $asOfDate :  Date) : void {
    __widgetOf(this, pcf.PendingPolicyTransactionsListViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $asOfDate})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $asOfDate :  Date) : void {
    __widgetOf(this, pcf.PendingPolicyTransactionsListViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $asOfDate})
  }
  
  
}