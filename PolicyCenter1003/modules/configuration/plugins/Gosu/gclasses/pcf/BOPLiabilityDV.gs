package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPLiabilityDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPLiabilityDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.BOPLiabilityDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyLine})
  }
  
  function refreshVariables ($policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.BOPLiabilityDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyLine})
  }
  
  
}