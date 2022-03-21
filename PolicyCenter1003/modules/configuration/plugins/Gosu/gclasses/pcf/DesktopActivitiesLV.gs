package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/DesktopActivitiesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DesktopActivitiesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activities :  gw.api.database.IQueryBeanResult<Activity>) : void {
    __widgetOf(this, pcf.DesktopActivitiesLV, SECTION_WIDGET_CLASS).setVariables(false, {$activities})
  }
  
  function refreshVariables ($activities :  gw.api.database.IQueryBeanResult<Activity>) : void {
    __widgetOf(this, pcf.DesktopActivitiesLV, SECTION_WIDGET_CLASS).setVariables(true, {$activities})
  }
  
  
}