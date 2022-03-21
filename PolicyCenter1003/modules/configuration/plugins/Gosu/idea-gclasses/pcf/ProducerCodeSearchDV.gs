package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ProducerCodeSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerCodeSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.product.ProducerCodeSearchCriteria) : void {
    __widgetOf(this, pcf.ProducerCodeSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria})
  }
  
  function refreshVariables ($searchCriteria :  gw.product.ProducerCodeSearchCriteria) : void {
    __widgetOf(this, pcf.ProducerCodeSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria})
  }
  
  
}