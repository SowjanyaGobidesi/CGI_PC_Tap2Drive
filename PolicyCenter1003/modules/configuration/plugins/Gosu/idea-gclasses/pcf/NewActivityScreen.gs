package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/NewActivityScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewActivityScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activity :  Activity, $note :  Note, $assignmentPopup :  gw.api.assignment.AssignmentPopup) : void {
    __widgetOf(this, pcf.NewActivityScreen, SECTION_WIDGET_CLASS).setVariables(false, {$activity, $note, $assignmentPopup})
  }
  
  function refreshVariables ($activity :  Activity, $note :  Note, $assignmentPopup :  gw.api.assignment.AssignmentPopup) : void {
    __widgetOf(this, pcf.NewActivityScreen, SECTION_WIDGET_CLASS).setVariables(true, {$activity, $note, $assignmentPopup})
  }
  
  
}