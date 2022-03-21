package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/VehicleClassCodeSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VehicleClassCodeSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.api.domain.VehicleClassCodeSearchCriteria, $searchResults :  gw.api.domain.VehicleClassCodeSearchResult[]) : void {
    __widgetOf(this, pcf.VehicleClassCodeSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $searchResults})
  }
  
  function refreshVariables ($searchCriteria :  gw.api.domain.VehicleClassCodeSearchCriteria, $searchResults :  gw.api.domain.VehicleClassCodeSearchResult[]) : void {
    __widgetOf(this, pcf.VehicleClassCodeSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $searchResults})
  }
  
  
}