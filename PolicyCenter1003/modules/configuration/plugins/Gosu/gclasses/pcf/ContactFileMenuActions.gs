package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ContactFileMenuActions.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactFileMenuActions extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactFileMenuActions, SECTION_WIDGET_CLASS).setVariables(false, {$contact})
  }
  
  function refreshVariables ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactFileMenuActions, SECTION_WIDGET_CLASS).setVariables(true, {$contact})
  }
  
  
}