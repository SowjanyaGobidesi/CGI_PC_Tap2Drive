package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/importexport/ImportWizard_UploadScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImportWizard_UploadScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : void {
    __widgetOf(this, pcf.ImportWizard_UploadScreen, SECTION_WIDGET_CLASS).setVariables(false, {$pcImportDataInfo})
  }
  
  function refreshVariables ($pcImportDataInfo :  gw.api.admin.PCImportDataInfo) : void {
    __widgetOf(this, pcf.ImportWizard_UploadScreen, SECTION_WIDGET_CLASS).setVariables(true, {$pcImportDataInfo})
  }
  
  
}