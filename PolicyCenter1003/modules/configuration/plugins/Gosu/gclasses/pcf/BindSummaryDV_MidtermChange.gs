package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/BindSummaryDV.MidtermChange.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BindSummaryDV_MidtermChange extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($thePeriod :  PolicyPeriod, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $isMidtermChange :  boolean) : void {
    __widgetOf(this, pcf.BindSummaryDV_MidtermChange, SECTION_WIDGET_CLASS).setVariables(false, {$thePeriod, $policyPeriodBillingInstructionsManager, $isMidtermChange})
  }
  
  function refreshVariables ($thePeriod :  PolicyPeriod, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $isMidtermChange :  boolean) : void {
    __widgetOf(this, pcf.BindSummaryDV_MidtermChange, SECTION_WIDGET_CLASS).setVariables(true, {$thePeriod, $policyPeriodBillingInstructionsManager, $isMidtermChange})
  }
  
  
}