package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingQuoteTestPeriodsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingQuoteTestPeriodsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($testCase :  ImpactTestingTestCase) : void {
    __widgetOf(this, pcf.ImpactTestingQuoteTestPeriodsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$testCase})
  }
  
  function refreshVariables ($testCase :  ImpactTestingTestCase) : void {
    __widgetOf(this, pcf.ImpactTestingQuoteTestPeriodsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$testCase})
  }
  
  
}