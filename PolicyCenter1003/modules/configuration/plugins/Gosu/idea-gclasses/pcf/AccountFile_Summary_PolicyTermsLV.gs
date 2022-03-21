package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_Summary_PolicyTermsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_Summary_PolicyTermsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account) : void {
    __widgetOf(this, pcf.AccountFile_Summary_PolicyTermsLV, SECTION_WIDGET_CLASS).setVariables(false, {$account})
  }
  
  function refreshVariables ($account :  Account) : void {
    __widgetOf(this, pcf.AccountFile_Summary_PolicyTermsLV, SECTION_WIDGET_CLASS).setVariables(true, {$account})
  }
  
  
}