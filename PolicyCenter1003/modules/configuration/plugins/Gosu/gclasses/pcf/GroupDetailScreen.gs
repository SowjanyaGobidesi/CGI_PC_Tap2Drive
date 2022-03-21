package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/GroupDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($group :  Group) : void {
    __widgetOf(this, pcf.GroupDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$group})
  }
  
  function refreshVariables ($group :  Group) : void {
    __widgetOf(this, pcf.GroupDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$group})
  }
  
  
}