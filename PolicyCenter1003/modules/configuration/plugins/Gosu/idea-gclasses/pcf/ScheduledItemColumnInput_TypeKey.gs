package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/ScheduledItemColumnInput.TypeKey.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScheduledItemColumnInput_TypeKey extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($schedulePropertyInfo :  gw.api.productmodel.SchedulePropertyInfo, $scheduledItem :  ScheduledItem) : void {
    __widgetOf(this, pcf.ScheduledItemColumnInput_TypeKey, SECTION_WIDGET_CLASS).setVariables(false, {$schedulePropertyInfo, $scheduledItem})
  }
  
  function refreshVariables ($schedulePropertyInfo :  gw.api.productmodel.SchedulePropertyInfo, $scheduledItem :  ScheduledItem) : void {
    __widgetOf(this, pcf.ScheduledItemColumnInput_TypeKey, SECTION_WIDGET_CLASS).setVariables(true, {$schedulePropertyInfo, $scheduledItem})
  }
  
  
}