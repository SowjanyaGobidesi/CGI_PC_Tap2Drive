package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BACoverageCostLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BACoverageCostLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($costs :  entity.BACost[], $prorated :  boolean, $addStateToCoverageName :  boolean) : void {
    __widgetOf(this, pcf.BACoverageCostLV, SECTION_WIDGET_CLASS).setVariables(false, {$costs, $prorated, $addStateToCoverageName})
  }
  
  function refreshVariables ($costs :  entity.BACost[], $prorated :  boolean, $addStateToCoverageName :  boolean) : void {
    __widgetOf(this, pcf.BACoverageCostLV, SECTION_WIDGET_CLASS).setVariables(true, {$costs, $prorated, $addStateToCoverageName})
  }
  
  
}