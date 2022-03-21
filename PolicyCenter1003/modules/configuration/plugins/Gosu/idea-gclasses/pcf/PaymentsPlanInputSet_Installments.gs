package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/PaymentsPlanInputSet.Installments.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PaymentsPlanInputSet_Installments extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.PaymentsPlanInputSet_Installments, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.PaymentsPlanInputSet_Installments, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriodBillingInstructionsManager})
  }
  
  
}