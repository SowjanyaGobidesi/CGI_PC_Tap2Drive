package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NotesDetailViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NotesDetailViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($noteHelper :  gw.api.web.dashboard.ui.note.NoteHelper) : void {
    __widgetOf(this, pcf.NotesDetailViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$noteHelper})
  }
  
  function refreshVariables ($noteHelper :  gw.api.web.dashboard.ui.note.NoteHelper) : void {
    __widgetOf(this, pcf.NotesDetailViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$noteHelper})
  }
  
  
}