package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/AuditAdjustmentsDV.MidtermReporting.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditAdjustmentsDV_MidtermReporting extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.AuditAdjustmentsDV_MidtermReporting, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.AuditAdjustmentsDV_MidtermReporting, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $policyPeriodBillingInstructionsManager})
  }
  
  
}