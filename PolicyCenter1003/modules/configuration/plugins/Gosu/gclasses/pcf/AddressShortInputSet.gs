package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/AddressShortInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AddressShortInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($address :  Address) : void {
    __widgetOf(this, pcf.AddressShortInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$address})
  }
  
  function refreshVariables ($address :  Address) : void {
    __widgetOf(this, pcf.AddressShortInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$address})
  }
  
  
}