package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/UserSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($users :  gw.api.database.IQueryBeanResult<User>) : void {
    __widgetOf(this, pcf.UserSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$users})
  }
  
  function refreshVariables ($users :  gw.api.database.IQueryBeanResult<User>) : void {
    __widgetOf(this, pcf.UserSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$users})
  }
  
  
}