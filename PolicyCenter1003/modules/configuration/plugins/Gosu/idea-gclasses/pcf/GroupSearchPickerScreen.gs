package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/groupsearch/GroupSearchPickerScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupSearchPickerScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($excludeGroup :  Group, $org :  Organization) : void {
    __widgetOf(this, pcf.GroupSearchPickerScreen, SECTION_WIDGET_CLASS).setVariables(false, {$excludeGroup, $org})
  }
  
  function refreshVariables ($excludeGroup :  Group, $org :  Organization) : void {
    __widgetOf(this, pcf.GroupSearchPickerScreen, SECTION_WIDGET_CLASS).setVariables(true, {$excludeGroup, $org})
  }
  
  
}