package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/ContingencyActivitiesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContingencyActivitiesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activities :  Activity[], $completionDateVisible :  boolean) : void {
    __widgetOf(this, pcf.ContingencyActivitiesLV, SECTION_WIDGET_CLASS).setVariables(false, {$activities, $completionDateVisible})
  }
  
  function refreshVariables ($activities :  Activity[], $completionDateVisible :  boolean) : void {
    __widgetOf(this, pcf.ContingencyActivitiesLV, SECTION_WIDGET_CLASS).setVariables(true, {$activities, $completionDateVisible})
  }
  
  
}