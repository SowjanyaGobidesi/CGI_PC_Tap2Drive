package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/ValidationPopupErrorsInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ValidationPopupErrorsInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($argsErrors :  java.lang.String[], $labelAbove :  boolean) : void {
    __widgetOf(this, pcf.ValidationPopupErrorsInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$argsErrors, $labelAbove})
  }
  
  function refreshVariables ($argsErrors :  java.lang.String[], $labelAbove :  boolean) : void {
    __widgetOf(this, pcf.ValidationPopupErrorsInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$argsErrors, $labelAbove})
  }
  
  
}