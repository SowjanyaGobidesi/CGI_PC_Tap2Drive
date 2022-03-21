package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/assignment/AssignmentSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AssignmentSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($AssignmentSearchTypes :  AssignmentSearchType[], $SearchResult :  gw.api.assignment.AssignmentSearchResult, $SearchCriteria :  gw.api.assignment.AssignmentSearchCriteria) : void {
    __widgetOf(this, pcf.AssignmentSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$AssignmentSearchTypes, $SearchResult, $SearchCriteria})
  }
  
  function refreshVariables ($AssignmentSearchTypes :  AssignmentSearchType[], $SearchResult :  gw.api.assignment.AssignmentSearchResult, $SearchCriteria :  gw.api.assignment.AssignmentSearchCriteria) : void {
    __widgetOf(this, pcf.AssignmentSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$AssignmentSearchTypes, $SearchResult, $SearchCriteria})
  }
  
  
}