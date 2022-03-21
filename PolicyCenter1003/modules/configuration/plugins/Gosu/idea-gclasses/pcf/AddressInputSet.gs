package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/AddressInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AddressInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($addressOwner :  gw.api.address.AddressOwner) : void {
    __widgetOf(this, pcf.AddressInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$addressOwner})
  }
  
  function refreshVariables ($addressOwner :  gw.api.address.AddressOwner) : void {
    __widgetOf(this, pcf.AddressInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$addressOwner})
  }
  
  
}