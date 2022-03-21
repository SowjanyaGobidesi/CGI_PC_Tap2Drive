package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/overview/OpenPolicyTransactionsAccountListViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OpenPolicyTransactionsAccountListViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account) : void {
    __widgetOf(this, pcf.OpenPolicyTransactionsAccountListViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$account})
  }
  
  function refreshVariables ($account :  Account) : void {
    __widgetOf(this, pcf.OpenPolicyTransactionsAccountListViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$account})
  }
  
  
}