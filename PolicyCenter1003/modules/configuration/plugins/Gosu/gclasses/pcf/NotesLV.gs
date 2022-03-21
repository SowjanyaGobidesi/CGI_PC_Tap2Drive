package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/NotesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NotesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($notes :  gw.api.database.IQueryBeanResult<Note>, $viewOnly :  boolean) : void {
    __widgetOf(this, pcf.NotesLV, SECTION_WIDGET_CLASS).setVariables(false, {$notes, $viewOnly})
  }
  
  function refreshVariables ($notes :  gw.api.database.IQueryBeanResult<Note>, $viewOnly :  boolean) : void {
    __widgetOf(this, pcf.NotesLV, SECTION_WIDGET_CLASS).setVariables(true, {$notes, $viewOnly})
  }
  
  
}