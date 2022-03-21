package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/CopyNotesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyNotesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($noteCopiers :  List<gw.note.NoteCopier>) : void {
    __widgetOf(this, pcf.CopyNotesLV, SECTION_WIDGET_CLASS).setVariables(false, {$noteCopiers})
  }
  
  function refreshVariables ($noteCopiers :  List<gw.note.NoteCopier>) : void {
    __widgetOf(this, pcf.CopyNotesLV, SECTION_WIDGET_CLASS).setVariables(true, {$noteCopiers})
  }
  
  
}