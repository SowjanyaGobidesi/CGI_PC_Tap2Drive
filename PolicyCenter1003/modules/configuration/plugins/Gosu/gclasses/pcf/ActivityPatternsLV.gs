package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ActivityPatternsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityPatternsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activityPatterns :  gw.api.database.IQueryBeanResult<ActivityPattern>) : void {
    __widgetOf(this, pcf.ActivityPatternsLV, SECTION_WIDGET_CLASS).setVariables(false, {$activityPatterns})
  }
  
  function refreshVariables ($activityPatterns :  gw.api.database.IQueryBeanResult<ActivityPattern>) : void {
    __widgetOf(this, pcf.ActivityPatternsLV, SECTION_WIDGET_CLASS).setVariables(true, {$activityPatterns})
  }
  
  
}