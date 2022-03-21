package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/properties/export/ExportPropertiesDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExportPropertiesDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($exportOptions :  gw.api.properties.PropertyExportOptions) : void {
    __widgetOf(this, pcf.ExportPropertiesDV, SECTION_WIDGET_CLASS).setVariables(false, {$exportOptions})
  }
  
  function refreshVariables ($exportOptions :  gw.api.properties.PropertyExportOptions) : void {
    __widgetOf(this, pcf.ExportPropertiesDV, SECTION_WIDGET_CLASS).setVariables(true, {$exportOptions})
  }
  
  
}