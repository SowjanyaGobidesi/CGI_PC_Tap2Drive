package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternCovTermValuesPanelSet.PackageCovTermPattern.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternCovTermValuesPanelSet_PackageCovTermPattern extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($formPatternCovTerm :  FormPatternCovTerm) : void {
    __widgetOf(this, pcf.FormPatternCovTermValuesPanelSet_PackageCovTermPattern, SECTION_WIDGET_CLASS).setVariables(false, {$formPatternCovTerm})
  }
  
  function refreshVariables ($formPatternCovTerm :  FormPatternCovTerm) : void {
    __widgetOf(this, pcf.FormPatternCovTermValuesPanelSet_PackageCovTermPattern, SECTION_WIDGET_CLASS).setVariables(true, {$formPatternCovTerm})
  }
  
  
}