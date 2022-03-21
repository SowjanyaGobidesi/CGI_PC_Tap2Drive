package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternCoveragePartTypesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternCoveragePartTypesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($formPattern :  FormPattern) : void {
    __widgetOf(this, pcf.FormPatternCoveragePartTypesLV, SECTION_WIDGET_CLASS).setVariables(false, {$formPattern})
  }
  
  function refreshVariables ($formPattern :  FormPattern) : void {
    __widgetOf(this, pcf.FormPatternCoveragePartTypesLV, SECTION_WIDGET_CLASS).setVariables(true, {$formPattern})
  }
  
  
}