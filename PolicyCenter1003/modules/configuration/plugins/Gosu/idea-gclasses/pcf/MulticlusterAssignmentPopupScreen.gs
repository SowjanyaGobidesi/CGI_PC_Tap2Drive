package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/assignment/MulticlusterAssignmentPopupScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterAssignmentPopupScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($AssignmentPopup :  gw.api.web.activity.MulticlusterActivityAssignmentPopup) : void {
    __widgetOf(this, pcf.MulticlusterAssignmentPopupScreen, SECTION_WIDGET_CLASS).setVariables(false, {$AssignmentPopup})
  }
  
  function refreshVariables ($AssignmentPopup :  gw.api.web.activity.MulticlusterActivityAssignmentPopup) : void {
    __widgetOf(this, pcf.MulticlusterAssignmentPopupScreen, SECTION_WIDGET_CLASS).setVariables(true, {$AssignmentPopup})
  }
  
  
}