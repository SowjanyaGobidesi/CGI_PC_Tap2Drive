package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AdminMenuTree.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdminMenuTree extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($treeModel :  gw.api.admin.PCOrganizationTreeModel, $org :  Organization, $group :  Group) : void {
    __widgetOf(this, pcf.AdminMenuTree, SECTION_WIDGET_CLASS).setVariables(false, {$treeModel, $org, $group})
  }
  
  function refreshVariables ($treeModel :  gw.api.admin.PCOrganizationTreeModel, $org :  Organization, $group :  Group) : void {
    __widgetOf(this, pcf.AdminMenuTree, SECTION_WIDGET_CLASS).setVariables(true, {$treeModel, $org, $group})
  }
  
  
}