package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPCoverageCostLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPCoverageCostLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($costs :  java.util.Set<BOPCost>) : void {
    __widgetOf(this, pcf.BOPCoverageCostLV, SECTION_WIDGET_CLASS).setVariables(false, {$costs})
  }
  
  function refreshVariables ($costs :  java.util.Set<BOPCost>) : void {
    __widgetOf(this, pcf.BOPCoverageCostLV, SECTION_WIDGET_CLASS).setVariables(true, {$costs})
  }
  
  
}