package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableStrategyCell.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableStrategyCell_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($selectedRateTable :  RateTable) : void {
    __widgetOf(this, pcf.RateTableStrategyCell_default, SECTION_WIDGET_CLASS).setVariables(false, {$selectedRateTable})
  }
  
  function refreshVariables ($selectedRateTable :  RateTable) : void {
    __widgetOf(this, pcf.RateTableStrategyCell_default, SECTION_WIDGET_CLASS).setVariables(true, {$selectedRateTable})
  }
  
  
}