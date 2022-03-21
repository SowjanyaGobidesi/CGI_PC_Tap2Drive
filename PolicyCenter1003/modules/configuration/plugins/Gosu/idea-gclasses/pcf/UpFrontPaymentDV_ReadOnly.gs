package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/billing/UpFrontPaymentDV.ReadOnly.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UpFrontPaymentDV_ReadOnly extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod, $billingStateContainer :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.UpFrontPaymentDV_ReadOnly, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod, $billingStateContainer})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod, $billingStateContainer :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.UpFrontPaymentDV_ReadOnly, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod, $billingStateContainer})
  }
  
  
}