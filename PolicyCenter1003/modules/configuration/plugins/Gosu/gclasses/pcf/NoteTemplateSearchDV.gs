package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NoteTemplateSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NoteTemplateSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($noteTemplateSearchCriteria :  NoteTemplateSearchCriteria) : void {
    __widgetOf(this, pcf.NoteTemplateSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$noteTemplateSearchCriteria})
  }
  
  function refreshVariables ($noteTemplateSearchCriteria :  NoteTemplateSearchCriteria) : void {
    __widgetOf(this, pcf.NoteTemplateSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$noteTemplateSearchCriteria})
  }
  
  
}