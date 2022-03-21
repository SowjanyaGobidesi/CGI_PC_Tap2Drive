package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/divide/DividePolicyPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DividePolicyPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($periodToDivide :  PolicyPeriod, $dividePolicySelection :  gw.product.DividePolicySelection) : void {
    __widgetOf(this, pcf.DividePolicyPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$periodToDivide, $dividePolicySelection})
  }
  
  function refreshVariables ($periodToDivide :  PolicyPeriod, $dividePolicySelection :  gw.product.DividePolicySelection) : void {
    __widgetOf(this, pcf.DividePolicyPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$periodToDivide, $dividePolicySelection})
  }
  
  
}