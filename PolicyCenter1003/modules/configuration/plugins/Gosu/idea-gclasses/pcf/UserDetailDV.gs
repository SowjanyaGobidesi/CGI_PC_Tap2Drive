package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UserDetailDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserDetailDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($user :  User, $canChangeOrganization :  boolean) : void {
    __widgetOf(this, pcf.UserDetailDV, SECTION_WIDGET_CLASS).setVariables(false, {$user, $canChangeOrganization})
  }
  
  function refreshVariables ($user :  User, $canChangeOrganization :  boolean) : void {
    __widgetOf(this, pcf.UserDetailDV, SECTION_WIDGET_CLASS).setVariables(true, {$user, $canChangeOrganization})
  }
  
  
}