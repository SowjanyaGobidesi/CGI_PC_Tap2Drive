package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/OrganizationDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($organization :  Organization, $orgHelper :  gw.web.admin.OrganizationUIHelper) : void {
    __widgetOf(this, pcf.OrganizationDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$organization, $orgHelper})
  }
  
  function refreshVariables ($organization :  Organization, $orgHelper :  gw.web.admin.OrganizationUIHelper) : void {
    __widgetOf(this, pcf.OrganizationDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$organization, $orgHelper})
  }
  
  
}