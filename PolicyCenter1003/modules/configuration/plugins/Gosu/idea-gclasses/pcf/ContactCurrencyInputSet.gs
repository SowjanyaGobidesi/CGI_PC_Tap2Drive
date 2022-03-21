package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/ContactCurrencyInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactCurrencyInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact, $address :  Address, $updatesCurrenciesOnCountryChange :  boolean) : void {
    __widgetOf(this, pcf.ContactCurrencyInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$contact, $address, $updatesCurrenciesOnCountryChange})
  }
  
  function refreshVariables ($contact :  Contact, $address :  Address, $updatesCurrenciesOnCountryChange :  boolean) : void {
    __widgetOf(this, pcf.ContactCurrencyInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$contact, $address, $updatesCurrenciesOnCountryChange})
  }
  
  
}