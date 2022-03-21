package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableStrategyCell.owning.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableStrategyCell_owning extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($selectedRateTable :  RateTable) : void {
    __widgetOf(this, pcf.RateTableStrategyCell_owning, SECTION_WIDGET_CLASS).setVariables(false, {$selectedRateTable})
  }
  
  function refreshVariables ($selectedRateTable :  RateTable) : void {
    __widgetOf(this, pcf.RateTableStrategyCell_owning, SECTION_WIDGET_CLASS).setVariables(true, {$selectedRateTable})
  }
  
  
}