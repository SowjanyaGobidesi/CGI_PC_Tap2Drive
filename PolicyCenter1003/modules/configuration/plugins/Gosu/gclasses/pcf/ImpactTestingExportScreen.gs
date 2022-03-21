package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingExportScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingExportScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($testCase :  ImpactTestingTestCase) : void {
    __widgetOf(this, pcf.ImpactTestingExportScreen, SECTION_WIDGET_CLASS).setVariables(false, {$testCase})
  }
  
  function refreshVariables ($testCase :  ImpactTestingTestCase) : void {
    __widgetOf(this, pcf.ImpactTestingExportScreen, SECTION_WIDGET_CLASS).setVariables(true, {$testCase})
  }
  
  
}