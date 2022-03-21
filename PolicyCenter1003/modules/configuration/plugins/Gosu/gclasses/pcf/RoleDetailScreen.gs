package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/RoleDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RoleDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($role :  Role) : void {
    __widgetOf(this, pcf.RoleDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$role})
  }
  
  function refreshVariables ($role :  Role) : void {
    __widgetOf(this, pcf.RoleDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$role})
  }
  
  
}