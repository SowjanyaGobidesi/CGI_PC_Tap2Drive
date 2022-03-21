package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/LocationsPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocationsPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $supportsNonSpecificLocation :  boolean) : void {
    __widgetOf(this, pcf.LocationsPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $supportsNonSpecificLocation})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $supportsNonSpecificLocation :  boolean) : void {
    __widgetOf(this, pcf.LocationsPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $supportsNonSpecificLocation})
  }
  
  
}