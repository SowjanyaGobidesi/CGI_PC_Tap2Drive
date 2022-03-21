package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/billing/PaymentInstrumentsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PaymentInstrumentsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($paymentInstruments :  gw.plugin.billing.BillingPaymentInstrument[], $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.PaymentInstrumentsLV, SECTION_WIDGET_CLASS).setVariables(false, {$paymentInstruments, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($paymentInstruments :  gw.plugin.billing.BillingPaymentInstrument[], $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.PaymentInstrumentsLV, SECTION_WIDGET_CLASS).setVariables(true, {$paymentInstruments, $policyPeriodBillingInstructionsManager})
  }
  
  
}