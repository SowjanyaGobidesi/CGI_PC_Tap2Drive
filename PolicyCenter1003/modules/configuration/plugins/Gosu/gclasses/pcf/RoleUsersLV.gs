package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/RoleUsersLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RoleUsersLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($role :  Role) : void {
    __widgetOf(this, pcf.RoleUsersLV, SECTION_WIDGET_CLASS).setVariables(false, {$role})
  }
  
  function refreshVariables ($role :  Role) : void {
    __widgetOf(this, pcf.RoleUsersLV, SECTION_WIDGET_CLASS).setVariables(true, {$role})
  }
  
  
}