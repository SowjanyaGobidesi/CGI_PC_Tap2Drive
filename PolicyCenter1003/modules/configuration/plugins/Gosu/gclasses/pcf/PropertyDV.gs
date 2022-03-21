package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/properties/PropertyDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PropertyDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($runtimeProperty :  RuntimeProperty, $isNew :  boolean) : void {
    __widgetOf(this, pcf.PropertyDV, SECTION_WIDGET_CLASS).setVariables(false, {$runtimeProperty, $isNew})
  }
  
  function refreshVariables ($runtimeProperty :  RuntimeProperty, $isNew :  boolean) : void {
    __widgetOf(this, pcf.PropertyDV, SECTION_WIDGET_CLASS).setVariables(true, {$runtimeProperty, $isNew})
  }
  
  
}