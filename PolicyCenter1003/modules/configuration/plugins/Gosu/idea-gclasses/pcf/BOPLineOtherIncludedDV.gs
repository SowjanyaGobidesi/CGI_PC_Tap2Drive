package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPLineOtherIncludedDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPLineOtherIncludedDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.BOPLineOtherIncludedDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyLine})
  }
  
  function refreshVariables ($policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.BOPLineOtherIncludedDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyLine})
  }
  
  
}