package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/OrganizationUsersLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationUsersLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($organization :  Organization) : void {
    __widgetOf(this, pcf.OrganizationUsersLV, SECTION_WIDGET_CLASS).setVariables(false, {$organization})
  }
  
  function refreshVariables ($organization :  Organization) : void {
    __widgetOf(this, pcf.OrganizationUsersLV, SECTION_WIDGET_CLASS).setVariables(true, {$organization})
  }
  
  
}