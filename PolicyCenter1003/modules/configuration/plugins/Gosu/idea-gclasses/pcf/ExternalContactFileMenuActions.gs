package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ExternalContactFileMenuActions.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExternalContactFileMenuActions extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contactSearchResult :  gw.plugin.contact.ContactResult) : void {
    __widgetOf(this, pcf.ExternalContactFileMenuActions, SECTION_WIDGET_CLASS).setVariables(false, {$contactSearchResult})
  }
  
  function refreshVariables ($contactSearchResult :  gw.plugin.contact.ContactResult) : void {
    __widgetOf(this, pcf.ExternalContactFileMenuActions, SECTION_WIDGET_CLASS).setVariables(true, {$contactSearchResult})
  }
  
  
}