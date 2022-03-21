package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/AdditionalNamedInsuredInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdditionalNamedInsuredInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.AdditionalNamedInsuredInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$period, $openForEdit})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.AdditionalNamedInsuredInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$period, $openForEdit})
  }
  
  
}