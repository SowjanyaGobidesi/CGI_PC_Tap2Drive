package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/billing/PolicyBillingSummaryChartTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyBillingSummaryChartTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($billingSummaryHelper :  gw.api.web.dashboard.ui.billing.BillingSummaryHelper) : void {
    __widgetOf(this, pcf.PolicyBillingSummaryChartTile, SECTION_WIDGET_CLASS).setVariables(false, {$billingSummaryHelper})
  }
  
  function refreshVariables ($billingSummaryHelper :  gw.api.web.dashboard.ui.billing.BillingSummaryHelper) : void {
    __widgetOf(this, pcf.PolicyBillingSummaryChartTile, SECTION_WIDGET_CLASS).setVariables(true, {$billingSummaryHelper})
  }
  
  
}