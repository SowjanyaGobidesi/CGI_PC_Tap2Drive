package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/CoveredAutoSymbolsPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoveredAutoSymbolsPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CoveredAutoSymbolsPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CoveredAutoSymbolsPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit})
  }
  
  
}