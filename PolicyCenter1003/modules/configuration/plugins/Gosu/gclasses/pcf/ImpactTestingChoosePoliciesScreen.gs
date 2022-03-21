package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingChoosePoliciesScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingChoosePoliciesScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($testCase :  ImpactTestingTestCase) : void {
    __widgetOf(this, pcf.ImpactTestingChoosePoliciesScreen, SECTION_WIDGET_CLASS).setVariables(false, {$testCase})
  }
  
  function refreshVariables ($testCase :  ImpactTestingTestCase) : void {
    __widgetOf(this, pcf.ImpactTestingChoosePoliciesScreen, SECTION_WIDGET_CLASS).setVariables(true, {$testCase})
  }
  
  
}