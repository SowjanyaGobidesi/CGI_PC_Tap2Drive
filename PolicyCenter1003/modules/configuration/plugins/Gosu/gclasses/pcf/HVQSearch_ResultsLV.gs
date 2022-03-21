package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/HVQSearch_ResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HVQSearch_ResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchResults :  List<gw.quoting.QuoteSummarySearchResult>) : void {
    __widgetOf(this, pcf.HVQSearch_ResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$searchResults})
  }
  
  function refreshVariables ($searchResults :  List<gw.quoting.QuoteSummarySearchResult>) : void {
    __widgetOf(this, pcf.HVQSearch_ResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$searchResults})
  }
  
  
}