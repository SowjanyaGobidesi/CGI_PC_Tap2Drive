package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CoverageInputSet.CPBPPCov.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoverageInputSet_CPBPPCov extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($coveragePattern :  gw.api.productmodel.ClausePattern, $coverable :  Coverable, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CoverageInputSet_CPBPPCov, SECTION_WIDGET_CLASS).setVariables(false, {$coveragePattern, $coverable, $openForEdit})
  }
  
  function refreshVariables ($coveragePattern :  gw.api.productmodel.ClausePattern, $coverable :  Coverable, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CoverageInputSet_CPBPPCov, SECTION_WIDGET_CLASS).setVariables(true, {$coveragePattern, $coverable, $openForEdit})
  }
  
  
}