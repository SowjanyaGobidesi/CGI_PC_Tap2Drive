package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/HVQAccountSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HVQAccountSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>, $quoteIdentifier :  String) : void {
    __widgetOf(this, pcf.HVQAccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$accountSummaries, $quoteIdentifier})
  }
  
  function refreshVariables ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>, $quoteIdentifier :  String) : void {
    __widgetOf(this, pcf.HVQAccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$accountSummaries, $quoteIdentifier})
  }
  
  
}