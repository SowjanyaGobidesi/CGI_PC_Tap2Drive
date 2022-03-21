package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/TargetedAddressInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TargetedAddressInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($addressOwner :  gw.api.address.AddressOwner) : void {
    __widgetOf(this, pcf.TargetedAddressInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$addressOwner})
  }
  
  function refreshVariables ($addressOwner :  gw.api.address.AddressOwner) : void {
    __widgetOf(this, pcf.TargetedAddressInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$addressOwner})
  }
  
  
}