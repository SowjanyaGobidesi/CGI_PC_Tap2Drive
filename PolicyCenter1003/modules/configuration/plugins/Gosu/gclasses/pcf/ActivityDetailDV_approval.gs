package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/ActivityDetailDV.approval.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityDetailDV_approval extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activity :  Activity) : void {
    __widgetOf(this, pcf.ActivityDetailDV_approval, SECTION_WIDGET_CLASS).setVariables(false, {$activity})
  }
  
  function refreshVariables ($activity :  Activity) : void {
    __widgetOf(this, pcf.ActivityDetailDV_approval, SECTION_WIDGET_CLASS).setVariables(true, {$activity})
  }
  
  
}