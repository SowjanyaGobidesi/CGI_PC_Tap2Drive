package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/ContactNameInputSet.person.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactNameInputSet_person extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactNameInputSet_person, SECTION_WIDGET_CLASS).setVariables(false, {$contact})
  }
  
  function refreshVariables ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactNameInputSet_person, SECTION_WIDGET_CLASS).setVariables(true, {$contact})
  }
  
  
}