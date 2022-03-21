package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/EditNoteDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditNoteDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($note :  Note) : void {
    __widgetOf(this, pcf.EditNoteDV, SECTION_WIDGET_CLASS).setVariables(false, {$note})
  }
  
  function refreshVariables ($note :  Note) : void {
    __widgetOf(this, pcf.EditNoteDV, SECTION_WIDGET_CLASS).setVariables(true, {$note})
  }
  
  
}