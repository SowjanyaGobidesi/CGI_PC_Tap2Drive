package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UserRolesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserRolesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($user :  User) : void {
    __widgetOf(this, pcf.UserRolesLV, SECTION_WIDGET_CLASS).setVariables(false, {$user})
  }
  
  function refreshVariables ($user :  User) : void {
    __widgetOf(this, pcf.UserRolesLV, SECTION_WIDGET_CLASS).setVariables(true, {$user})
  }
  
  
}