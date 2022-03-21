package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/assignment/AssignmentPopupDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AssignmentPopupDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($assignmentPopup :  gw.api.assignment.AssignmentPopup, $searchResult :  gw.api.assignment.AssignmentSearchResult, $searchCriteria :  gw.api.assignment.AssignmentSearchCriteria) : void {
    __widgetOf(this, pcf.AssignmentPopupDV, SECTION_WIDGET_CLASS).setVariables(false, {$assignmentPopup, $searchResult, $searchCriteria})
  }
  
  function refreshVariables ($assignmentPopup :  gw.api.assignment.AssignmentPopup, $searchResult :  gw.api.assignment.AssignmentSearchResult, $searchCriteria :  gw.api.assignment.AssignmentSearchCriteria) : void {
    __widgetOf(this, pcf.AssignmentPopupDV, SECTION_WIDGET_CLASS).setVariables(true, {$assignmentPopup, $searchResult, $searchCriteria})
  }
  
  
}