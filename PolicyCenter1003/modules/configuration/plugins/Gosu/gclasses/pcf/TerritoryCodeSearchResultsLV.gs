package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/TerritoryCodeSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TerritoryCodeSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchResults :  Territory[]) : void {
    __widgetOf(this, pcf.TerritoryCodeSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$searchResults})
  }
  
  function refreshVariables ($searchResults :  Territory[]) : void {
    __widgetOf(this, pcf.TerritoryCodeSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$searchResults})
  }
  
  
}