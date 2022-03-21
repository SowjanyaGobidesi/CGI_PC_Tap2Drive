package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AdminGroupSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdminGroupSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  GroupSearchCriteria) : void {
    __widgetOf(this, pcf.AdminGroupSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  GroupSearchCriteria) : void {
    __widgetOf(this, pcf.AdminGroupSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}