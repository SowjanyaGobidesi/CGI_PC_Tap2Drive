package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/ProgramSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProgramSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter () : void {
    __widgetOf(this, pcf.ProgramSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {})
  }
  
  function refreshVariables () : void {
    __widgetOf(this, pcf.ProgramSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {})
  }
  
  
}