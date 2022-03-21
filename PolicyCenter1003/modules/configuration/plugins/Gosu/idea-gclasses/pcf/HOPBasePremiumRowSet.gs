package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPBasePremiumRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPBasePremiumRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($costs :  List<entity.HOPCost>, $proRatedCosts :  boolean) : void {
    __widgetOf(this, pcf.HOPBasePremiumRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$costs, $proRatedCosts})
  }
  
  function refreshVariables ($costs :  List<entity.HOPCost>, $proRatedCosts :  boolean) : void {
    __widgetOf(this, pcf.HOPBasePremiumRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$costs, $proRatedCosts})
  }
  
  
}