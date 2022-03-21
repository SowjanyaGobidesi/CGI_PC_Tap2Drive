package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/StateCostRowSet.total.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class StateCostRowSet_total extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($costWrapper :  gw.api.ui.CostWrapper) : void {
    __widgetOf(this, pcf.StateCostRowSet_total, SECTION_WIDGET_CLASS).setVariables(false, {$costWrapper})
  }
  
  function refreshVariables ($costWrapper :  gw.api.ui.CostWrapper) : void {
    __widgetOf(this, pcf.StateCostRowSet_total, SECTION_WIDGET_CLASS).setVariables(true, {$costWrapper})
  }
  
  
}