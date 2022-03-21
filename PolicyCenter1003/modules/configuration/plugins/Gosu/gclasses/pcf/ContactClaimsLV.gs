package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contactfile/ContactClaimsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactClaimsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($claims :  Claim[], $preferredCurrency :  Currency) : void {
    __widgetOf(this, pcf.ContactClaimsLV, SECTION_WIDGET_CLASS).setVariables(false, {$claims, $preferredCurrency})
  }
  
  function refreshVariables ($claims :  Claim[], $preferredCurrency :  Currency) : void {
    __widgetOf(this, pcf.ContactClaimsLV, SECTION_WIDGET_CLASS).setVariables(true, {$claims, $preferredCurrency})
  }
  
  
}