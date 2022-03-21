package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/NoteRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NoteRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($note :  Note, $viewOnly :  boolean, $noteCopier :  gw.note.NoteCopier) : void {
    __widgetOf(this, pcf.NoteRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$note, $viewOnly, $noteCopier})
  }
  
  function refreshVariables ($note :  Note, $viewOnly :  boolean, $noteCopier :  gw.note.NoteCopier) : void {
    __widgetOf(this, pcf.NoteRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$note, $viewOnly, $noteCopier})
  }
  
  
}