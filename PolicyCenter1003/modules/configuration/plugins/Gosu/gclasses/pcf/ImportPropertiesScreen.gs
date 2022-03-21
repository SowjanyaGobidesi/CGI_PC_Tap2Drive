package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/properties/import/ImportPropertiesScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImportPropertiesScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($importData :  gw.api.properties.PropertyImportData) : void {
    __widgetOf(this, pcf.ImportPropertiesScreen, SECTION_WIDGET_CLASS).setVariables(false, {$importData})
  }
  
  function refreshVariables ($importData :  gw.api.properties.PropertyImportData) : void {
    __widgetOf(this, pcf.ImportPropertiesScreen, SECTION_WIDGET_CLASS).setVariables(true, {$importData})
  }
  
  
}