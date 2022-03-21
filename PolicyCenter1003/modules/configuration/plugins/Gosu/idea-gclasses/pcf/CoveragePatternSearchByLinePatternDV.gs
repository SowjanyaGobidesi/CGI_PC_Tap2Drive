package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/CoveragePatternSearchByLinePatternDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoveragePatternSearchByLinePatternDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.productmodel.ClausePatternSearchCriteria, $policyLinePattern :  gw.api.productmodel.PolicyLinePattern) : void {
    __widgetOf(this, pcf.CoveragePatternSearchByLinePatternDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $policyLinePattern})
  }
  
  function refreshVariables ($searchCriteria :  gw.productmodel.ClausePatternSearchCriteria, $policyLinePattern :  gw.api.productmodel.PolicyLinePattern) : void {
    __widgetOf(this, pcf.CoveragePatternSearchByLinePatternDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $policyLinePattern})
  }
  
  
}