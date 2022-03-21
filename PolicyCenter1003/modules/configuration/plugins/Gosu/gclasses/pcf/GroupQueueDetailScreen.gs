package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/GroupQueueDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupQueueDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($assignableQueue :  AssignableQueue, $group :  Group) : void {
    __widgetOf(this, pcf.GroupQueueDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$assignableQueue, $group})
  }
  
  function refreshVariables ($assignableQueue :  AssignableQueue, $group :  Group) : void {
    __widgetOf(this, pcf.GroupQueueDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$assignableQueue, $group})
  }
  
  
}