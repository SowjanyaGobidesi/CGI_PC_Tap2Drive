package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/CoverageInputSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoverageInputSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($coveragePattern :  gw.api.productmodel.ClausePattern, $coverable :  Coverable, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CoverageInputSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$coveragePattern, $coverable, $openForEdit})
  }
  
  function refreshVariables ($coveragePattern :  gw.api.productmodel.ClausePattern, $coverable :  Coverable, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CoverageInputSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$coveragePattern, $coverable, $openForEdit})
  }
  
  
}