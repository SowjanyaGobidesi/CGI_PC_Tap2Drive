package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/EditNoteScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditNoteScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($note :  Note) : void {
    __widgetOf(this, pcf.EditNoteScreen, SECTION_WIDGET_CLASS).setVariables(false, {$note})
  }
  
  function refreshVariables ($note :  Note) : void {
    __widgetOf(this, pcf.EditNoteScreen, SECTION_WIDGET_CLASS).setVariables(true, {$note})
  }
  
  
}