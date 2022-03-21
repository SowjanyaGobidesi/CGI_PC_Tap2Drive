package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.rating.rtm.query.RateRoutineSearchCriteria) : void {
    __widgetOf(this, pcf.RateRoutineSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.rating.rtm.query.RateRoutineSearchCriteria) : void {
    __widgetOf(this, pcf.RateRoutineSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}