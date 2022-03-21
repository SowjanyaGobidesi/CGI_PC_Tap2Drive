package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPModifiersPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPModifiersPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.HOPModifiersPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.HOPModifiersPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit})
  }
  
  
}