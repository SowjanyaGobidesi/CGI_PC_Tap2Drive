package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/groupsearch/GroupSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  GroupSearchCriteria) : void {
    __widgetOf(this, pcf.GroupSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  GroupSearchCriteria) : void {
    __widgetOf(this, pcf.GroupSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}