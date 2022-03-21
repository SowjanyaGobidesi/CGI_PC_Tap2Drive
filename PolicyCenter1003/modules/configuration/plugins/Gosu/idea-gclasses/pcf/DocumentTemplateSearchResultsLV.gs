package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/DocumentTemplateSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentTemplateSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($documentTemplateSearchResultsList :  entity.DocumentTemplateSearchResults[]) : void {
    __widgetOf(this, pcf.DocumentTemplateSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$documentTemplateSearchResultsList})
  }
  
  function refreshVariables ($documentTemplateSearchResultsList :  entity.DocumentTemplateSearchResults[]) : void {
    __widgetOf(this, pcf.DocumentTemplateSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$documentTemplateSearchResultsList})
  }
  
  
}