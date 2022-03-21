package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternDetailCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternDetailCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($formPattern :  FormPattern) : void {
    __widgetOf(this, pcf.FormPatternDetailCV, SECTION_WIDGET_CLASS).setVariables(false, {$formPattern})
  }
  
  function refreshVariables ($formPattern :  FormPattern) : void {
    __widgetOf(this, pcf.FormPatternDetailCV, SECTION_WIDGET_CLASS).setVariables(true, {$formPattern})
  }
  
  
}