package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/ContactNameInputSet.company.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactNameInputSet_company extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactNameInputSet_company, SECTION_WIDGET_CLASS).setVariables(false, {$contact})
  }
  
  function refreshVariables ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactNameInputSet_company, SECTION_WIDGET_CLASS).setVariables(true, {$contact})
  }
  
  
}