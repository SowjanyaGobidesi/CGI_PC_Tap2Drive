package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableModalCell.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableModalCell_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($cell :  gw.rating.rtm.domain.table.RateTableCell, $valueProvider :  gw.rating.rtm.valueprovider.RateTableCellValueProvider, $valueRequired :  boolean) : void {
    __widgetOf(this, pcf.RateTableModalCell_default, SECTION_WIDGET_CLASS).setVariables(false, {$cell, $valueProvider, $valueRequired})
  }
  
  function refreshVariables ($cell :  gw.rating.rtm.domain.table.RateTableCell, $valueProvider :  gw.rating.rtm.valueprovider.RateTableCellValueProvider, $valueRequired :  boolean) : void {
    __widgetOf(this, pcf.RateTableModalCell_default, SECTION_WIDGET_CLASS).setVariables(true, {$cell, $valueProvider, $valueRequired})
  }
  
  
}