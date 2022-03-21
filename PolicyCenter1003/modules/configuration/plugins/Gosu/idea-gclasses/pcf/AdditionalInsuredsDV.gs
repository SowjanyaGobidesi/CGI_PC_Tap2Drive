package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/AdditionalInsuredsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdditionalInsuredsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLine :  PolicyLine, $openForEdit :  boolean, $displayLabel :  boolean, $additionalInformationVisible :  boolean) : void {
    __widgetOf(this, pcf.AdditionalInsuredsDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyLine, $openForEdit, $displayLabel, $additionalInformationVisible})
  }
  
  function refreshVariables ($policyLine :  PolicyLine, $openForEdit :  boolean, $displayLabel :  boolean, $additionalInformationVisible :  boolean) : void {
    __widgetOf(this, pcf.AdditionalInsuredsDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyLine, $openForEdit, $displayLabel, $additionalInformationVisible})
  }
  
  
}