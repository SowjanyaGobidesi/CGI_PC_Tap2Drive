package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/AuditAdjustmentsDV.Editable.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditAdjustmentsDV_Editable extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.AuditAdjustmentsDV_Editable, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $policyPeriodBillingInstructionsManager})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager) : void {
    __widgetOf(this, pcf.AuditAdjustmentsDV_Editable, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $policyPeriodBillingInstructionsManager})
  }
  
  
}