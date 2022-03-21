package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/CreateAccountContactInputSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateAccountContactInputSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact) : void {
    __widgetOf(this, pcf.CreateAccountContactInputSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$contact})
  }
  
  function refreshVariables ($contact :  Contact) : void {
    __widgetOf(this, pcf.CreateAccountContactInputSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$contact})
  }
  
  
}