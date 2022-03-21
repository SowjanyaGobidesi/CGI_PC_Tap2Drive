package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/loadandvacation/EditableLoadFactorsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditableLoadFactorsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($groupUserList :  GroupUser[]) : void {
    __widgetOf(this, pcf.EditableLoadFactorsLV, SECTION_WIDGET_CLASS).setVariables(false, {$groupUserList})
  }
  
  function refreshVariables ($groupUserList :  GroupUser[]) : void {
    __widgetOf(this, pcf.EditableLoadFactorsLV, SECTION_WIDGET_CLASS).setVariables(true, {$groupUserList})
  }
  
  
}