package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/FailedAssignmentsLV.Activity.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FailedAssignmentsLV_Activity extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($assignmentPopup :  gw.api.assignment.AssignmentPopup) : void {
    __widgetOf(this, pcf.FailedAssignmentsLV_Activity, SECTION_WIDGET_CLASS).setVariables(false, {$assignmentPopup})
  }
  
  function refreshVariables ($assignmentPopup :  gw.api.assignment.AssignmentPopup) : void {
    __widgetOf(this, pcf.FailedAssignmentsLV_Activity, SECTION_WIDGET_CLASS).setVariables(true, {$assignmentPopup})
  }
  
  
}