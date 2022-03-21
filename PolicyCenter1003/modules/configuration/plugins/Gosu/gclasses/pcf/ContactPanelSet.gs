package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/ContactPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$contact})
  }
  
  function refreshVariables ($contact :  Contact) : void {
    __widgetOf(this, pcf.ContactPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$contact})
  }
  
  
}