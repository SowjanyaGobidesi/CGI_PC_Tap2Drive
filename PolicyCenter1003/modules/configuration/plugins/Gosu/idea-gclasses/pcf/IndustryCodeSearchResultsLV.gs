package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/IndustryCodeSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IndustryCodeSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($industryCodes :  gw.api.database.IQueryBeanResult<IndustryCode>) : void {
    __widgetOf(this, pcf.IndustryCodeSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$industryCodes})
  }
  
  function refreshVariables ($industryCodes :  gw.api.database.IQueryBeanResult<IndustryCode>) : void {
    __widgetOf(this, pcf.IndustryCodeSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$industryCodes})
  }
  
  
}