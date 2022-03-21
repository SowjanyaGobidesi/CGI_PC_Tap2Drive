package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/StateCostsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class StateCostsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($stateCosts :  gw.api.ui.CostWrapper[]) : void {
    __widgetOf(this, pcf.StateCostsLV, SECTION_WIDGET_CLASS).setVariables(false, {$stateCosts})
  }
  
  function refreshVariables ($stateCosts :  gw.api.ui.CostWrapper[]) : void {
    __widgetOf(this, pcf.StateCostsLV, SECTION_WIDGET_CLASS).setVariables(true, {$stateCosts})
  }
  
  
}