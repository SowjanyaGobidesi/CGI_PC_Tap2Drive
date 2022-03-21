package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/properties/PropertyDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PropertyDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($runtimeProperty :  RuntimeProperty, $isNew :  boolean) : void {
    __widgetOf(this, pcf.PropertyDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$runtimeProperty, $isNew})
  }
  
  function refreshVariables ($runtimeProperty :  RuntimeProperty, $isNew :  boolean) : void {
    __widgetOf(this, pcf.PropertyDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$runtimeProperty, $isNew})
  }
  
  
}