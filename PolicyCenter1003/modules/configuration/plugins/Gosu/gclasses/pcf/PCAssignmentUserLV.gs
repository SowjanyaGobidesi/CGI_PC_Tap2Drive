package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/PCAssignmentUserLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PCAssignmentUserLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($groupUsers :  gw.api.database.IQueryBeanResult<GroupUser>) : void {
    __widgetOf(this, pcf.PCAssignmentUserLV, SECTION_WIDGET_CLASS).setVariables(false, {$groupUsers})
  }
  
  function refreshVariables ($groupUsers :  gw.api.database.IQueryBeanResult<GroupUser>) : void {
    __widgetOf(this, pcf.PCAssignmentUserLV, SECTION_WIDGET_CLASS).setVariables(true, {$groupUsers})
  }
  
  
}