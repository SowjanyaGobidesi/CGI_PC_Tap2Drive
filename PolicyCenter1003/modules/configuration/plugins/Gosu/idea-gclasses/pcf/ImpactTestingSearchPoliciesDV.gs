package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/impact/ImpactTestingSearchPoliciesDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ImpactTestingSearchPoliciesDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($criteria :  gw.rating.impact.ImpactTestingSearchCriteria, $productToAdd :  gw.api.productmodel.Product, $jurisdictionToAdd :  Jurisdiction, $producerCodeToAdd :  ProducerCode) : void {
    __widgetOf(this, pcf.ImpactTestingSearchPoliciesDV, SECTION_WIDGET_CLASS).setVariables(false, {$criteria, $productToAdd, $jurisdictionToAdd, $producerCodeToAdd})
  }
  
  function refreshVariables ($criteria :  gw.rating.impact.ImpactTestingSearchCriteria, $productToAdd :  gw.api.productmodel.Product, $jurisdictionToAdd :  Jurisdiction, $producerCodeToAdd :  ProducerCode) : void {
    __widgetOf(this, pcf.ImpactTestingSearchPoliciesDV, SECTION_WIDGET_CLASS).setVariables(true, {$criteria, $productToAdd, $jurisdictionToAdd, $producerCodeToAdd})
  }
  
  
}