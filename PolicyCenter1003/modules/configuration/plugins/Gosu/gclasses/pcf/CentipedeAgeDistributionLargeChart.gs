package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/CentipedeAgeDistributionLargeChart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CentipedeAgeDistributionLargeChart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($pageHelper :  gw.api.cache2.CacheInfoPageHelper, $snapshot :  com.guidewire.pl.system.cache2.CacheStatisticsSnapshot) : void {
    __widgetOf(this, pcf.CentipedeAgeDistributionLargeChart, SECTION_WIDGET_CLASS).setVariables(false, {$pageHelper, $snapshot})
  }
  
  function refreshVariables ($pageHelper :  gw.api.cache2.CacheInfoPageHelper, $snapshot :  com.guidewire.pl.system.cache2.CacheStatisticsSnapshot) : void {
    __widgetOf(this, pcf.CentipedeAgeDistributionLargeChart, SECTION_WIDGET_CLASS).setVariables(true, {$pageHelper, $snapshot})
  }
  
  
}