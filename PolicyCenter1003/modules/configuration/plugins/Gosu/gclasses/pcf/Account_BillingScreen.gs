package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/Account_BillingScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Account_BillingScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $accountNumber :  String, $billingSummary :  gw.plugin.billing.BCAccountBillingDisplayTotals) : void {
    __widgetOf(this, pcf.Account_BillingScreen, SECTION_WIDGET_CLASS).setVariables(false, {$account, $accountNumber, $billingSummary})
  }
  
  function refreshVariables ($account :  Account, $accountNumber :  String, $billingSummary :  gw.plugin.billing.BCAccountBillingDisplayTotals) : void {
    __widgetOf(this, pcf.Account_BillingScreen, SECTION_WIDGET_CLASS).setVariables(true, {$account, $accountNumber, $billingSummary})
  }
  
  
}