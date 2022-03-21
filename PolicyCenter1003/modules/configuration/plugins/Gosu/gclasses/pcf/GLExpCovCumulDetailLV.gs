package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/gl/policy/GLExpCovCumulDetailLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GLExpCovCumulDetailLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($locCosts :  java.util.Set<GLCovExposureCost>) : void {
    __widgetOf(this, pcf.GLExpCovCumulDetailLV, SECTION_WIDGET_CLASS).setVariables(false, {$locCosts})
  }
  
  function refreshVariables ($locCosts :  java.util.Set<GLCovExposureCost>) : void {
    __widgetOf(this, pcf.GLExpCovCumulDetailLV, SECTION_WIDGET_CLASS).setVariables(true, {$locCosts})
  }
  
  
}