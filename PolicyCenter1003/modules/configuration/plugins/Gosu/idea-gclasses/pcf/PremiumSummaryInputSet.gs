package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/PremiumSummaryInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PremiumSummaryInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $thePeriod :  PolicyPeriod, $isMidtermChange :  boolean) : void {
    __widgetOf(this, pcf.PremiumSummaryInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriodBillingInstructionsManager, $thePeriod, $isMidtermChange})
  }
  
  function refreshVariables ($policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $thePeriod :  PolicyPeriod, $isMidtermChange :  boolean) : void {
    __widgetOf(this, pcf.PremiumSummaryInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriodBillingInstructionsManager, $thePeriod, $isMidtermChange})
  }
  
  
}