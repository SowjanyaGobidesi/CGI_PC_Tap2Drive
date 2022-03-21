package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/properties/export/ExportPropertiesScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExportPropertiesScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($exportOptions :  gw.api.properties.PropertyExportOptions) : void {
    __widgetOf(this, pcf.ExportPropertiesScreen, SECTION_WIDGET_CLASS).setVariables(false, {$exportOptions})
  }
  
  function refreshVariables ($exportOptions :  gw.api.properties.PropertyExportOptions) : void {
    __widgetOf(this, pcf.ExportPropertiesScreen, SECTION_WIDGET_CLASS).setVariables(true, {$exportOptions})
  }
  
  
}