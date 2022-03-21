package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/RiskClassSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RiskClassSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.lob.common.RiskClassSearchCriteria) : void {
    __widgetOf(this, pcf.RiskClassSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.lob.common.RiskClassSearchCriteria) : void {
    __widgetOf(this, pcf.RiskClassSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}