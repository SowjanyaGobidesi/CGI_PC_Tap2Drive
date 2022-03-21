package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/HVQSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HVQSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($defaultQuoteKey :  gw.api.quoting.QuoteKey) : void {
    __widgetOf(this, pcf.HVQSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$defaultQuoteKey})
  }
  
  function refreshVariables ($defaultQuoteKey :  gw.api.quoting.QuoteKey) : void {
    __widgetOf(this, pcf.HVQSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$defaultQuoteKey})
  }
  
  
}