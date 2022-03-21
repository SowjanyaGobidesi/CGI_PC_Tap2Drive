package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ActivitiesSearchLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivitiesSearchLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activities :  gw.api.database.IQueryBeanResult<Activity>, $policyNumber :  String) : void {
    __widgetOf(this, pcf.ActivitiesSearchLV, SECTION_WIDGET_CLASS).setVariables(false, {$activities, $policyNumber})
  }
  
  function refreshVariables ($activities :  gw.api.database.IQueryBeanResult<Activity>, $policyNumber :  String) : void {
    __widgetOf(this, pcf.ActivitiesSearchLV, SECTION_WIDGET_CLASS).setVariables(true, {$activities, $policyNumber})
  }
  
  
}