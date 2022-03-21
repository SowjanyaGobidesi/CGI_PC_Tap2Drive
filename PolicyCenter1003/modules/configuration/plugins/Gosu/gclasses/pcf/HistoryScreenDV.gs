package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/HistoryScreenDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HistoryScreenDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyHistorySearch :  gw.history.HistorySearchCriteria, $relatedtocriteria :  Object[]) : void {
    __widgetOf(this, pcf.HistoryScreenDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyHistorySearch, $relatedtocriteria})
  }
  
  function refreshVariables ($policyHistorySearch :  gw.history.HistorySearchCriteria, $relatedtocriteria :  Object[]) : void {
    __widgetOf(this, pcf.HistoryScreenDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyHistorySearch, $relatedtocriteria})
  }
  
  
}