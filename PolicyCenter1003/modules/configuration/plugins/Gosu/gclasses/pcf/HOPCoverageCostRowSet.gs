package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPCoverageCostRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPCoverageCostRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($costs :  List<HOPCost>, $proRatedCosts :  boolean) : void {
    __widgetOf(this, pcf.HOPCoverageCostRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$costs, $proRatedCosts})
  }
  
  function refreshVariables ($costs :  List<HOPCost>, $proRatedCosts :  boolean) : void {
    __widgetOf(this, pcf.HOPCoverageCostRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$costs, $proRatedCosts})
  }
  
  
}