package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/roles/RoleProducerCodesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RoleProducerCodesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($role :  Role) : void {
    __widgetOf(this, pcf.RoleProducerCodesLV, SECTION_WIDGET_CLASS).setVariables(false, {$role})
  }
  
  function refreshVariables ($role :  Role) : void {
    __widgetOf(this, pcf.RoleProducerCodesLV, SECTION_WIDGET_CLASS).setVariables(true, {$role})
  }
  
  
}