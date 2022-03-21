package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($allRateBooks :  gw.api.database.IQueryBeanResult<entity.RateBook>, $initialRateBook :  RateBook) : void {
    __widgetOf(this, pcf.RateBookPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$allRateBooks, $initialRateBook})
  }
  
  function refreshVariables ($allRateBooks :  gw.api.database.IQueryBeanResult<entity.RateBook>, $initialRateBook :  RateBook) : void {
    __widgetOf(this, pcf.RateBookPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$allRateBooks, $initialRateBook})
  }
  
  
}