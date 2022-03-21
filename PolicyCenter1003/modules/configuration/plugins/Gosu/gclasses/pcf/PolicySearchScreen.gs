package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/PolicySearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicySearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter () : void {
    __widgetOf(this, pcf.PolicySearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {})
  }
  
  function refreshVariables () : void {
    __widgetOf(this, pcf.PolicySearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {})
  }
  
  
}