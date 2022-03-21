package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/DatabasePolicySearchPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DatabasePolicySearchPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter () : void {
    __widgetOf(this, pcf.DatabasePolicySearchPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {})
  }
  
  function refreshVariables () : void {
    __widgetOf(this, pcf.DatabasePolicySearchPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {})
  }
  
  
}