package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/Policy_BillingScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Policy_BillingScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $billingPlugin :  gw.plugin.billing.IBillingSummaryPlugin, $policyTermInfos :  gw.plugin.billing.BillingTermInfo[], $billingSummary :  gw.plugin.billing.BillingPeriodInfo, $uiHelper :  gw.web.policy.PolicyBillingUIHelper) : void {
    __widgetOf(this, pcf.Policy_BillingScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $billingPlugin, $policyTermInfos, $billingSummary, $uiHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $billingPlugin :  gw.plugin.billing.IBillingSummaryPlugin, $policyTermInfos :  gw.plugin.billing.BillingTermInfo[], $billingSummary :  gw.plugin.billing.BillingPeriodInfo, $uiHelper :  gw.web.policy.PolicyBillingUIHelper) : void {
    __widgetOf(this, pcf.Policy_BillingScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $billingPlugin, $policyTermInfos, $billingSummary, $uiHelper})
  }
  
  
}