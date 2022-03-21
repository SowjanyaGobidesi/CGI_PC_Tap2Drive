package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NoteTemplateSearchResultLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NoteTemplateSearchResultLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($noteTemplateSearchResultsList :  NoteTemplateSearchResults[]) : void {
    __widgetOf(this, pcf.NoteTemplateSearchResultLV, SECTION_WIDGET_CLASS).setVariables(false, {$noteTemplateSearchResultsList})
  }
  
  function refreshVariables ($noteTemplateSearchResultsList :  NoteTemplateSearchResults[]) : void {
    __widgetOf(this, pcf.NoteTemplateSearchResultLV, SECTION_WIDGET_CLASS).setVariables(true, {$noteTemplateSearchResultsList})
  }
  
  
}