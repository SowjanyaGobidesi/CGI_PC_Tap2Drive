package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/ActivityDetailNoteDV.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityDetailNoteDV_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activity :  Activity, $note :  Note) : void {
    __widgetOf(this, pcf.ActivityDetailNoteDV_default, SECTION_WIDGET_CLASS).setVariables(false, {$activity, $note})
  }
  
  function refreshVariables ($activity :  Activity, $note :  Note) : void {
    __widgetOf(this, pcf.ActivityDetailNoteDV_default, SECTION_WIDGET_CLASS).setVariables(true, {$activity, $note})
  }
  
  
}