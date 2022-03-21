package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/overview/AccountDetailsDetailViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountDetailsDetailViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account) : void {
    __widgetOf(this, pcf.AccountDetailsDetailViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$account})
  }
  
  function refreshVariables ($account :  Account) : void {
    __widgetOf(this, pcf.AccountDetailsDetailViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$account})
  }
  
  
}