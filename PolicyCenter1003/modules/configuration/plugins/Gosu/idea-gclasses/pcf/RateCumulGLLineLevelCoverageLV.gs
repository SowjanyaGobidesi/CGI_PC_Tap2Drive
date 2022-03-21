package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/gl/policy/RateCumulGLLineLevelCoverageLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateCumulGLLineLevelCoverageLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($lineLevelCovCosts :  java.util.Set<GLLineCovCost>) : void {
    __widgetOf(this, pcf.RateCumulGLLineLevelCoverageLV, SECTION_WIDGET_CLASS).setVariables(false, {$lineLevelCovCosts})
  }
  
  function refreshVariables ($lineLevelCovCosts :  java.util.Set<GLLineCovCost>) : void {
    __widgetOf(this, pcf.RateCumulGLLineLevelCoverageLV, SECTION_WIDGET_CLASS).setVariables(true, {$lineLevelCovCosts})
  }
  
  
}