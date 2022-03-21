package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.rating.rtm.query.RateBookSearchCriteria) : void {
    __widgetOf(this, pcf.RateBookSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.rating.rtm.query.RateBookSearchCriteria) : void {
    __widgetOf(this, pcf.RateBookSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}