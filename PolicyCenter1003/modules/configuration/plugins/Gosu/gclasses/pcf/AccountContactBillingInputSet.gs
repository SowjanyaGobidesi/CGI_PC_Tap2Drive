package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/billing/AccountContactBillingInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountContactBillingInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  entity.Account, $openForEdit :  boolean, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $preferredSettlementCurrency :  typekey.Currency) : void {
    __widgetOf(this, pcf.AccountContactBillingInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$account, $openForEdit, $policyPeriodBillingInstructionsManager, $preferredSettlementCurrency})
  }
  
  function refreshVariables ($account :  entity.Account, $openForEdit :  boolean, $policyPeriodBillingInstructionsManager :  gw.billing.PolicyPeriodBillingInstructionsManager, $preferredSettlementCurrency :  typekey.Currency) : void {
    __widgetOf(this, pcf.AccountContactBillingInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$account, $openForEdit, $policyPeriodBillingInstructionsManager, $preferredSettlementCurrency})
  }
  
  
}