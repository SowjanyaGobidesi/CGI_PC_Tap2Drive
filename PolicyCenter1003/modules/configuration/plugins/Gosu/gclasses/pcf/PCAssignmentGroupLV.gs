package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/PCAssignmentGroupLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PCAssignmentGroupLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($groups :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.PCAssignmentGroupLV, SECTION_WIDGET_CLASS).setVariables(false, {$groups})
  }
  
  function refreshVariables ($groups :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.PCAssignmentGroupLV, SECTION_WIDGET_CLASS).setVariables(true, {$groups})
  }
  
  
}