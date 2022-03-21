package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($initialRateBook :  RateBook, $displayImportResults :  boolean) : void {
    __widgetOf(this, pcf.RateBookSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$initialRateBook, $displayImportResults})
  }
  
  function refreshVariables ($initialRateBook :  RateBook, $displayImportResults :  boolean) : void {
    __widgetOf(this, pcf.RateBookSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$initialRateBook, $displayImportResults})
  }
  
  
}