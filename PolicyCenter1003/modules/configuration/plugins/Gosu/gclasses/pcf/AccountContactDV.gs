package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountContactDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountContactDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact, $anAccount :  Account) : void {
    __widgetOf(this, pcf.AccountContactDV, SECTION_WIDGET_CLASS).setVariables(false, {$contact, $anAccount})
  }
  
  function refreshVariables ($contact :  Contact, $anAccount :  Account) : void {
    __widgetOf(this, pcf.AccountContactDV, SECTION_WIDGET_CLASS).setVariables(true, {$contact, $anAccount})
  }
  
  
}