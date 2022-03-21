package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/BillingAdjustmentPreviewPaymentsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BillingAdjustmentPreviewPaymentsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($invoicesPreview :  gw.plugin.billing.BillingPaymentsPreview, $job :  Job) : void {
    __widgetOf(this, pcf.BillingAdjustmentPreviewPaymentsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$invoicesPreview, $job})
  }
  
  function refreshVariables ($invoicesPreview :  gw.plugin.billing.BillingPaymentsPreview, $job :  Job) : void {
    __widgetOf(this, pcf.BillingAdjustmentPreviewPaymentsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$invoicesPreview, $job})
  }
  
  
}