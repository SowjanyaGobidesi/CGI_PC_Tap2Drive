package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/AdditionalInterestDetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdditionalInterestDetailsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($interestContainer :  gw.api.contact.AdditionalInterestContainer, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.AdditionalInterestDetailsDV, SECTION_WIDGET_CLASS).setVariables(false, {$interestContainer, $openForEdit})
  }
  
  function refreshVariables ($interestContainer :  gw.api.contact.AdditionalInterestContainer, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.AdditionalInterestDetailsDV, SECTION_WIDGET_CLASS).setVariables(true, {$interestContainer, $openForEdit})
  }
  
  
}