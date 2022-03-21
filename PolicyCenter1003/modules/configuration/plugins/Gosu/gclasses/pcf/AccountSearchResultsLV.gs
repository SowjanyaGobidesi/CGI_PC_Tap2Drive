package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/AccountSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>) : void {
    __widgetOf(this, pcf.AccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$accountSummaries})
  }
  
  function refreshVariables ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>) : void {
    __widgetOf(this, pcf.AccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$accountSummaries})
  }
  
  
}