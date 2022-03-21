package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/EmptyInvoiceStreamsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EmptyInvoiceStreamsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.EmptyInvoiceStreamsLV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.EmptyInvoiceStreamsLV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriodBillingInstructionsManager})
  }
  
  
}