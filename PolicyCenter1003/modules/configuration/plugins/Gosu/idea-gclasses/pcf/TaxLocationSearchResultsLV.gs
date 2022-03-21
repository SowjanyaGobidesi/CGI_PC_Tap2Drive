package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/TaxLocationSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TaxLocationSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchResults :  TaxLocation[]) : void {
    __widgetOf(this, pcf.TaxLocationSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$searchResults})
  }
  
  function refreshVariables ($searchResults :  TaxLocation[]) : void {
    __widgetOf(this, pcf.TaxLocationSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$searchResults})
  }
  
  
}