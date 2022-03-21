package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/importexport/ImportResultsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImportResultsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : void {
    __widgetOf(this, pcf.ImportResultsDV, SECTION_WIDGET_CLASS).setVariables(false, {$pcImportDataInfo})
  }
  
  function refreshVariables ($pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : void {
    __widgetOf(this, pcf.ImportResultsDV, SECTION_WIDGET_CLASS).setVariables(true, {$pcImportDataInfo})
  }
  
  
}