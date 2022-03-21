package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/BasicContactInfoInputSet.person.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BasicContactInfoInputSet_person extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  ContactSearchCriteria) : void {
    __widgetOf(this, pcf.BasicContactInfoInputSet_person, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  ContactSearchCriteria) : void {
    __widgetOf(this, pcf.BasicContactInfoInputSet_person, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}