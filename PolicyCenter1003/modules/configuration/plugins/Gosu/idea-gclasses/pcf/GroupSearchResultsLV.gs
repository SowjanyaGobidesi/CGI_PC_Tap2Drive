package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/GroupSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($groupList :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.GroupSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$groupList})
  }
  
  function refreshVariables ($groupList :  gw.api.database.IQueryBeanResult<Group>) : void {
    __widgetOf(this, pcf.GroupSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$groupList})
  }
  
  
}