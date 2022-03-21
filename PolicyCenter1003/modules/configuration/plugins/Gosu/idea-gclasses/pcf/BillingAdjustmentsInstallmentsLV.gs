package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/BillingAdjustmentsInstallmentsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BillingAdjustmentsInstallmentsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $installmentPlans :  gw.plugin.billing.InstallmentPlanData[], $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.BillingAdjustmentsInstallmentsLV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $installmentPlans, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $installmentPlans :  gw.plugin.billing.InstallmentPlanData[], $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.BillingAdjustmentsInstallmentsLV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $installmentPlans, $policyPeriodBillingInstructionsManager})
  }
  
  
}