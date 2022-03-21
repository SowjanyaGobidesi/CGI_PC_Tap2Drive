package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/LinkedAddressContactsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LinkedAddressContactsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($address :  Address) : void {
    __widgetOf(this, pcf.LinkedAddressContactsLV, SECTION_WIDGET_CLASS).setVariables(false, {$address})
  }
  
  function refreshVariables ($address :  Address) : void {
    __widgetOf(this, pcf.LinkedAddressContactsLV, SECTION_WIDGET_CLASS).setVariables(true, {$address})
  }
  
  
}