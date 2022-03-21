package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/ProgramScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProgramScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($program :  RIProgram) : void {
    __widgetOf(this, pcf.ProgramScreen, SECTION_WIDGET_CLASS).setVariables(false, {$program})
  }
  
  function refreshVariables ($program :  RIProgram) : void {
    __widgetOf(this, pcf.ProgramScreen, SECTION_WIDGET_CLASS).setVariables(true, {$program})
  }
  
  
}