package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UserAttributesSearchLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserAttributesSearchLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchResult :  gw.api.database.IQueryBeanResult<Attribute>) : void {
    __widgetOf(this, pcf.UserAttributesSearchLV, SECTION_WIDGET_CLASS).setVariables(false, {$searchResult})
  }
  
  function refreshVariables ($searchResult :  gw.api.database.IQueryBeanResult<Attribute>) : void {
    __widgetOf(this, pcf.UserAttributesSearchLV, SECTION_WIDGET_CLASS).setVariables(true, {$searchResult})
  }
  
  
}