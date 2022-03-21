package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/InvoiceStreamInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InvoiceStreamInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $thePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.InvoiceStreamInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriodBillingInstructionsManager, $thePeriod})
  }
  
  function refreshVariables ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $thePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.InvoiceStreamInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriodBillingInstructionsManager, $thePeriod})
  }
  
  
}