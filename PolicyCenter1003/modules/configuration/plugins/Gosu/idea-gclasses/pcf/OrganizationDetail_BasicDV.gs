package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/OrganizationDetail_BasicDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationDetail_BasicDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($group :  Group, $orgHelper :  gw.web.admin.OrganizationUIHelper) : void {
    __widgetOf(this, pcf.OrganizationDetail_BasicDV, SECTION_WIDGET_CLASS).setVariables(false, {$group, $orgHelper})
  }
  
  function refreshVariables ($group :  Group, $orgHelper :  gw.web.admin.OrganizationUIHelper) : void {
    __widgetOf(this, pcf.OrganizationDetail_BasicDV, SECTION_WIDGET_CLASS).setVariables(true, {$group, $orgHelper})
  }
  
  
}