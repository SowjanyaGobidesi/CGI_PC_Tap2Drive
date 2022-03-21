package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/InvoiceStreamsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InvoiceStreamsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.InvoiceStreamsLV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.InvoiceStreamsLV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriodBillingInstructionsManager})
  }
  
  
}