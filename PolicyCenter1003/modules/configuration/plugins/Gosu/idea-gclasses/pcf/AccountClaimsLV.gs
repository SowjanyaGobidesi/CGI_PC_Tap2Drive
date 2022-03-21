package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountClaimsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountClaimsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($claims :  Claim[], $filterSet :  gw.losshistory.ClaimPolicyPeriodFilterSet, $account :  Account) : void {
    __widgetOf(this, pcf.AccountClaimsLV, SECTION_WIDGET_CLASS).setVariables(false, {$claims, $filterSet, $account})
  }
  
  function refreshVariables ($claims :  Claim[], $filterSet :  gw.losshistory.ClaimPolicyPeriodFilterSet, $account :  Account) : void {
    __widgetOf(this, pcf.AccountClaimsLV, SECTION_WIDGET_CLASS).setVariables(true, {$claims, $filterSet, $account})
  }
  
  
}