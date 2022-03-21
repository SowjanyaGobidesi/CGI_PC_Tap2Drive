package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/FederatedDesktopActivitiesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedDesktopActivitiesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($processedActivities :  Set<String>) : void {
    __widgetOf(this, pcf.FederatedDesktopActivitiesLV, SECTION_WIDGET_CLASS).setVariables(false, {$processedActivities})
  }
  
  function refreshVariables ($processedActivities :  Set<String>) : void {
    __widgetOf(this, pcf.FederatedDesktopActivitiesLV, SECTION_WIDGET_CLASS).setVariables(true, {$processedActivities})
  }
  
  
}