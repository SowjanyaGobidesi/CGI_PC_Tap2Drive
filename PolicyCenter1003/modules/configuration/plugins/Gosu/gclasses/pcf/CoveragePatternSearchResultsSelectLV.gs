package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/CoveragePatternSearchResultsSelectLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoveragePatternSearchResultsSelectLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($coveragePatterns :  gw.api.productmodel.ClausePattern[]) : void {
    __widgetOf(this, pcf.CoveragePatternSearchResultsSelectLV, SECTION_WIDGET_CLASS).setVariables(false, {$coveragePatterns})
  }
  
  function refreshVariables ($coveragePatterns :  gw.api.productmodel.ClausePattern[]) : void {
    __widgetOf(this, pcf.CoveragePatternSearchResultsSelectLV, SECTION_WIDGET_CLASS).setVariables(true, {$coveragePatterns})
  }
  
  
}