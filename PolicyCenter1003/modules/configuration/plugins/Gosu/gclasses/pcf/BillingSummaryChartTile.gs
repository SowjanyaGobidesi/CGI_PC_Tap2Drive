package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/billing/BillingSummaryChartTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BillingSummaryChartTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($billingSummaryHelper :  gw.api.web.dashboard.ui.billing.BillingSummaryHelper) : void {
    __widgetOf(this, pcf.BillingSummaryChartTile, SECTION_WIDGET_CLASS).setVariables(false, {$billingSummaryHelper})
  }
  
  function refreshVariables ($billingSummaryHelper :  gw.api.web.dashboard.ui.billing.BillingSummaryHelper) : void {
    __widgetOf(this, pcf.BillingSummaryChartTile, SECTION_WIDGET_CLASS).setVariables(true, {$billingSummaryHelper})
  }
  
  
}