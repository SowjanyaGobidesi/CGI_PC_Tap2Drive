package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPLinePropertyDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPLinePropertyDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyline :  PolicyLine) : void {
    __widgetOf(this, pcf.BOPLinePropertyDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyline})
  }
  
  function refreshVariables ($policyline :  PolicyLine) : void {
    __widgetOf(this, pcf.BOPLinePropertyDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyline})
  }
  
  
}