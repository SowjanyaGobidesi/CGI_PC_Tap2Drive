package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UserAttributesSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserAttributesSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.api.admin.AttributeSearchCriteria) : void {
    __widgetOf(this, pcf.UserAttributesSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.api.admin.AttributeSearchCriteria) : void {
    __widgetOf(this, pcf.UserAttributesSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}