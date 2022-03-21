package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountCurrencyInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountCurrencyInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $address :  Address, $updatesCurrenciesOnCountryChange :  boolean) : void {
    __widgetOf(this, pcf.AccountCurrencyInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$account, $address, $updatesCurrenciesOnCountryChange})
  }
  
  function refreshVariables ($account :  Account, $address :  Address, $updatesCurrenciesOnCountryChange :  boolean) : void {
    __widgetOf(this, pcf.AccountCurrencyInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$account, $address, $updatesCurrenciesOnCountryChange})
  }
  
  
}