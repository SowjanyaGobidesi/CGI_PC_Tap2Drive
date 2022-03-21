package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_Contacts_PoliciesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_Contacts_PoliciesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($acctContact :  AccountContact) : void {
    __widgetOf(this, pcf.AccountFile_Contacts_PoliciesLV, SECTION_WIDGET_CLASS).setVariables(false, {$acctContact})
  }
  
  function refreshVariables ($acctContact :  AccountContact) : void {
    __widgetOf(this, pcf.AccountFile_Contacts_PoliciesLV, SECTION_WIDGET_CLASS).setVariables(true, {$acctContact})
  }
  
  
}