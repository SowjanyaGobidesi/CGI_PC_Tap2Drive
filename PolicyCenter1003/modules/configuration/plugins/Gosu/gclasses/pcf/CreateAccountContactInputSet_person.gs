package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/CreateAccountContactInputSet.person.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateAccountContactInputSet_person extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact) : void {
    __widgetOf(this, pcf.CreateAccountContactInputSet_person, SECTION_WIDGET_CLASS).setVariables(false, {$contact})
  }
  
  function refreshVariables ($contact :  Contact) : void {
    __widgetOf(this, pcf.CreateAccountContactInputSet_person, SECTION_WIDGET_CLASS).setVariables(true, {$contact})
  }
  
  
}