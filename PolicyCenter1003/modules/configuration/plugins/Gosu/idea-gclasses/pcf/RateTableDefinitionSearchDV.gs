package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableDefinitionSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableDefinitionSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.rating.rtm.query.RateTableDefinitionSearchCriteria) : void {
    __widgetOf(this, pcf.RateTableDefinitionSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.rating.rtm.query.RateTableDefinitionSearchCriteria) : void {
    __widgetOf(this, pcf.RateTableDefinitionSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}