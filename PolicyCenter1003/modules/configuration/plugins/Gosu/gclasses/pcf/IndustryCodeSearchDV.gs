package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/IndustryCodeSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IndustryCodeSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.product.IndustryCodeSearchCriteria) : void {
    __widgetOf(this, pcf.IndustryCodeSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.product.IndustryCodeSearchCriteria) : void {
    __widgetOf(this, pcf.IndustryCodeSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}