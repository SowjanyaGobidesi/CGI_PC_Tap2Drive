package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/OrganizationBranchSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationBranchSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  GroupSearchCriteria) : void {
    __widgetOf(this, pcf.OrganizationBranchSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  GroupSearchCriteria) : void {
    __widgetOf(this, pcf.OrganizationBranchSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}