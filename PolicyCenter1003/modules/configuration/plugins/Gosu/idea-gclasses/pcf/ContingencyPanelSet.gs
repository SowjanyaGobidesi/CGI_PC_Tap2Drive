package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/ContingencyPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContingencyPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  entity.PolicyPeriod) : void {
    __widgetOf(this, pcf.ContingencyPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  entity.PolicyPeriod) : void {
    __widgetOf(this, pcf.ContingencyPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}