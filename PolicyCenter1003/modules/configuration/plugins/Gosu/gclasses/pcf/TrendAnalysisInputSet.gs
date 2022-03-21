package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/TrendAnalysisInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TrendAnalysisInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $usePersistedTrendValues :  boolean) : void {
    __widgetOf(this, pcf.TrendAnalysisInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $usePersistedTrendValues})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $usePersistedTrendValues :  boolean) : void {
    __widgetOf(this, pcf.TrendAnalysisInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $usePersistedTrendValues})
  }
  
  
}