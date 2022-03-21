package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/CoveragePatternSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoveragePatternSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.productmodel.ClausePatternSearchCriteria, $policyLinePattern :  gw.api.productmodel.PolicyLinePattern, $categories :  String[], $includeElseExclude :  boolean) : void {
    __widgetOf(this, pcf.CoveragePatternSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $policyLinePattern, $categories, $includeElseExclude})
  }
  
  function refreshVariables ($searchCriteria :  gw.productmodel.ClausePatternSearchCriteria, $policyLinePattern :  gw.api.productmodel.PolicyLinePattern, $categories :  String[], $includeElseExclude :  boolean) : void {
    __widgetOf(this, pcf.CoveragePatternSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $policyLinePattern, $categories, $includeElseExclude})
  }
  
  
}