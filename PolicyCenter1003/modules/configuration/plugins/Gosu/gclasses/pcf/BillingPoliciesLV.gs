package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/billing/BillingPoliciesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BillingPoliciesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $areOwnedPolicies :  boolean) : void {
    __widgetOf(this, pcf.BillingPoliciesLV, SECTION_WIDGET_CLASS).setVariables(false, {$account, $areOwnedPolicies})
  }
  
  function refreshVariables ($account :  Account, $areOwnedPolicies :  boolean) : void {
    __widgetOf(this, pcf.BillingPoliciesLV, SECTION_WIDGET_CLASS).setVariables(true, {$account, $areOwnedPolicies})
  }
  
  
}