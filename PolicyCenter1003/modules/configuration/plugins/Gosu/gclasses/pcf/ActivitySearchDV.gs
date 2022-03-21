package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ActivitySearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivitySearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.activity.ActivitySearchCriteria) : void {
    __widgetOf(this, pcf.ActivitySearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.activity.ActivitySearchCriteria) : void {
    __widgetOf(this, pcf.ActivitySearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}