package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternCovTermsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternCovTermsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($formPattern :  FormPattern) : void {
    __widgetOf(this, pcf.FormPatternCovTermsLV, SECTION_WIDGET_CLASS).setVariables(false, {$formPattern})
  }
  
  function refreshVariables ($formPattern :  FormPattern) : void {
    __widgetOf(this, pcf.FormPatternCovTermsLV, SECTION_WIDGET_CLASS).setVariables(true, {$formPattern})
  }
  
  
}