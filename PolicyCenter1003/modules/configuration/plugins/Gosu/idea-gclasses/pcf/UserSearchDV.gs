package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/UserSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  UserSearchCriteria, $organizationFixed :  Boolean, $userTypeFixed :  boolean) : void {
    __widgetOf(this, pcf.UserSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $organizationFixed, $userTypeFixed})
  }
  
  function refreshVariables ($searchCriteria :  UserSearchCriteria, $organizationFixed :  Boolean, $userTypeFixed :  boolean) : void {
    __widgetOf(this, pcf.UserSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $organizationFixed, $userTypeFixed})
  }
  
  
}