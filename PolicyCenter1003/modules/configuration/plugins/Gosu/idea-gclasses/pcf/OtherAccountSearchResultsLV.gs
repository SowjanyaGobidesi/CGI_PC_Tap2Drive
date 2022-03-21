package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/OtherAccountSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OtherAccountSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>, $currentAccount :  entity.Account, $searchReason :  gw.account.AccountSearchReason) : void {
    __widgetOf(this, pcf.OtherAccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$accountSummaries, $currentAccount, $searchReason})
  }
  
  function refreshVariables ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>, $currentAccount :  entity.Account, $searchReason :  gw.account.AccountSearchReason) : void {
    __widgetOf(this, pcf.OtherAccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$accountSummaries, $currentAccount, $searchReason})
  }
  
  
}