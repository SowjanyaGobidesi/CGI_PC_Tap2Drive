package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPTotalCostLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPTotalCostLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($allCosts :  List<HOPCost>) : void {
    __widgetOf(this, pcf.HOPTotalCostLV, SECTION_WIDGET_CLASS).setVariables(false, {$allCosts})
  }
  
  function refreshVariables ($allCosts :  List<HOPCost>) : void {
    __widgetOf(this, pcf.HOPTotalCostLV, SECTION_WIDGET_CLASS).setVariables(true, {$allCosts})
  }
  
  
}