package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NewNoteScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewNoteScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($newNoteHelper :  gw.note.NewNoteHelper) : void {
    __widgetOf(this, pcf.NewNoteScreen, SECTION_WIDGET_CLASS).setVariables(false, {$newNoteHelper})
  }
  
  function refreshVariables ($newNoteHelper :  gw.note.NewNoteHelper) : void {
    __widgetOf(this, pcf.NewNoteScreen, SECTION_WIDGET_CLASS).setVariables(true, {$newNoteHelper})
  }
  
  
}