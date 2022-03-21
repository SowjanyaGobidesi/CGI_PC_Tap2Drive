package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookDetailsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookDetailsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rateBook :  RateBook, $displayImportResults :  boolean, $warnings :  List<String>) : void {
    __widgetOf(this, pcf.RateBookDetailsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rateBook, $displayImportResults, $warnings})
  }
  
  function refreshVariables ($rateBook :  RateBook, $displayImportResults :  boolean, $warnings :  List<String>) : void {
    __widgetOf(this, pcf.RateBookDetailsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rateBook, $displayImportResults, $warnings})
  }
  
  
}