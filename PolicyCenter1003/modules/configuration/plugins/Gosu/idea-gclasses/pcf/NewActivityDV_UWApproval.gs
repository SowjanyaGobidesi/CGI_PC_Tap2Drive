package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/NewActivityDV.UWApproval.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewActivityDV_UWApproval extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activity :  Activity, $assignmentPopup :  gw.api.assignment.AssignmentPopup, $assigneePicker :  gw.assignment.PCAssigneePicker) : void {
    __widgetOf(this, pcf.NewActivityDV_UWApproval, SECTION_WIDGET_CLASS).setVariables(false, {$activity, $assignmentPopup, $assigneePicker})
  }
  
  function refreshVariables ($activity :  Activity, $assignmentPopup :  gw.api.assignment.AssignmentPopup, $assigneePicker :  gw.assignment.PCAssigneePicker) : void {
    __widgetOf(this, pcf.NewActivityDV_UWApproval, SECTION_WIDGET_CLASS).setVariables(true, {$activity, $assignmentPopup, $assigneePicker})
  }
  
  
}