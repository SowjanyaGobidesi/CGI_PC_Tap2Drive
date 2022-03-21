package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/DocumentTemplateSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentTemplateSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($documentTemplateSearchCriteria :  DocumentTemplateSearchCriteria) : void {
    __widgetOf(this, pcf.DocumentTemplateSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$documentTemplateSearchCriteria})
  }
  
  function refreshVariables ($documentTemplateSearchCriteria :  DocumentTemplateSearchCriteria) : void {
    __widgetOf(this, pcf.DocumentTemplateSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$documentTemplateSearchCriteria})
  }
  
  
}