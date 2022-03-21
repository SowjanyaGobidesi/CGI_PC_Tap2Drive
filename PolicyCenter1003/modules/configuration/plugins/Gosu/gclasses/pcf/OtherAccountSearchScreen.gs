package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/OtherAccountSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OtherAccountSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($currentAccount :  entity.Account, $searchReason :  gw.account.AccountSearchReason) : void {
    __widgetOf(this, pcf.OtherAccountSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$currentAccount, $searchReason})
  }
  
  function refreshVariables ($currentAccount :  entity.Account, $searchReason :  gw.account.AccountSearchReason) : void {
    __widgetOf(this, pcf.OtherAccountSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$currentAccount, $searchReason})
  }
  
  
}