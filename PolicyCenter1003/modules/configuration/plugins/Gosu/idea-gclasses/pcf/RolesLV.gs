package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/RolesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RolesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($roles :  gw.api.database.IQueryBeanResult<Role>) : void {
    __widgetOf(this, pcf.RolesLV, SECTION_WIDGET_CLASS).setVariables(false, {$roles})
  }
  
  function refreshVariables ($roles :  gw.api.database.IQueryBeanResult<Role>) : void {
    __widgetOf(this, pcf.RolesLV, SECTION_WIDGET_CLASS).setVariables(true, {$roles})
  }
  
  
}