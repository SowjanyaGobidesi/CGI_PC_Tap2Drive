package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/HVQPolicySearchPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HVQPolicySearchPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($defaultQuoteKey :  gw.api.quoting.QuoteKey) : void {
    __widgetOf(this, pcf.HVQPolicySearchPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$defaultQuoteKey})
  }
  
  function refreshVariables ($defaultQuoteKey :  gw.api.quoting.QuoteKey) : void {
    __widgetOf(this, pcf.HVQPolicySearchPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$defaultQuoteKey})
  }
  
  
}