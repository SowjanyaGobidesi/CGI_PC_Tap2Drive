package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/EffectivePeriodInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EffectivePeriodInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($criteria :  gw.reinsurance.search.EffectivePeriodSearchCriteria) : void {
    __widgetOf(this, pcf.EffectivePeriodInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$criteria})
  }
  
  function refreshVariables ($criteria :  gw.reinsurance.search.EffectivePeriodSearchCriteria) : void {
    __widgetOf(this, pcf.EffectivePeriodInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$criteria})
  }
  
  
}