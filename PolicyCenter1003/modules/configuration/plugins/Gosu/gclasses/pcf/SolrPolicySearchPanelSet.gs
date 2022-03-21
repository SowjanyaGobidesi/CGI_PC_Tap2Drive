package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/SolrPolicySearchPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SolrPolicySearchPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter () : void {
    __widgetOf(this, pcf.SolrPolicySearchPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {})
  }
  
  function refreshVariables () : void {
    __widgetOf(this, pcf.SolrPolicySearchPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {})
  }
  
  
}