package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/assignment/MulticlusterAssignmentGroupLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterAssignmentGroupLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($Groups :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.MulticlusterAssignmentGroupLV, SECTION_WIDGET_CLASS).setVariables(false, {$Groups})
  }
  
  function refreshVariables ($Groups :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.MulticlusterAssignmentGroupLV, SECTION_WIDGET_CLASS).setVariables(true, {$Groups})
  }
  
  
}