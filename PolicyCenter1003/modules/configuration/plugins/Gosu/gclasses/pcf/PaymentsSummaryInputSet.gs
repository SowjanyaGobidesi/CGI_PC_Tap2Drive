package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/PaymentsSummaryInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PaymentsSummaryInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $thePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PaymentsSummaryInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriodBillingInstructionsManager, $thePeriod})
  }
  
  function refreshVariables ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $thePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PaymentsSummaryInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriodBillingInstructionsManager, $thePeriod})
  }
  
  
}