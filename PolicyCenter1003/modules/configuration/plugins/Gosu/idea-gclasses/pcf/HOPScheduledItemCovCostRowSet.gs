package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPScheduledItemCovCostRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPScheduledItemCovCostRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($costs :  List<HOPCost>, $proRatedCosts :  boolean) : void {
    __widgetOf(this, pcf.HOPScheduledItemCovCostRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$costs, $proRatedCosts})
  }
  
  function refreshVariables ($costs :  List<HOPCost>, $proRatedCosts :  boolean) : void {
    __widgetOf(this, pcf.HOPScheduledItemCovCostRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$costs, $proRatedCosts})
  }
  
  
}