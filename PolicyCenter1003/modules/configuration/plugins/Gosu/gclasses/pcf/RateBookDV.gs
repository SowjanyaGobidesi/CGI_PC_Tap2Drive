package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($ratebook :  RateBook) : void {
    __widgetOf(this, pcf.RateBookDV, SECTION_WIDGET_CLASS).setVariables(false, {$ratebook})
  }
  
  function refreshVariables ($ratebook :  RateBook) : void {
    __widgetOf(this, pcf.RateBookDV, SECTION_WIDGET_CLASS).setVariables(true, {$ratebook})
  }
  
  
}