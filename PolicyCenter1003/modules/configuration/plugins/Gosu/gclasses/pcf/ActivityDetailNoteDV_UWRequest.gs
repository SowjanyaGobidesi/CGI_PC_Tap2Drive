package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/ActivityDetailNoteDV.UWRequest.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityDetailNoteDV_UWRequest extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activity :  Activity, $note :  Note) : void {
    __widgetOf(this, pcf.ActivityDetailNoteDV_UWRequest, SECTION_WIDGET_CLASS).setVariables(false, {$activity, $note})
  }
  
  function refreshVariables ($activity :  Activity, $note :  Note) : void {
    __widgetOf(this, pcf.ActivityDetailNoteDV_UWRequest, SECTION_WIDGET_CLASS).setVariables(true, {$activity, $note})
  }
  
  
}