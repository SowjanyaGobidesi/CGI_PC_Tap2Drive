package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/AccountSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.account.AccountSearchCriteria, $relatedToAccount :  Account) : void {
    __widgetOf(this, pcf.AccountSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $relatedToAccount})
  }
  
  function refreshVariables ($searchCriteria :  gw.account.AccountSearchCriteria, $relatedToAccount :  Account) : void {
    __widgetOf(this, pcf.AccountSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $relatedToAccount})
  }
  
  
}