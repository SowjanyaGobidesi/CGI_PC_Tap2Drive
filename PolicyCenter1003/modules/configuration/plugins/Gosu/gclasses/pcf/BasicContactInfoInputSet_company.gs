package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/BasicContactInfoInputSet.company.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BasicContactInfoInputSet_company extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  ContactSearchCriteria) : void {
    __widgetOf(this, pcf.BasicContactInfoInputSet_company, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  ContactSearchCriteria) : void {
    __widgetOf(this, pcf.BasicContactInfoInputSet_company, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}