package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/new/ProductSelectionLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProductSelectionLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($productOffers :  ProductSelection[], $account :  Account, $producerSelection :  ProducerSelection, $createSingle :  boolean, $quoteType :  QuoteType, $uiHelper :  gw.web.job.submission.NewSubmissionUIHelper) : void {
    __widgetOf(this, pcf.ProductSelectionLV, SECTION_WIDGET_CLASS).setVariables(false, {$productOffers, $account, $producerSelection, $createSingle, $quoteType, $uiHelper})
  }
  
  function refreshVariables ($productOffers :  ProductSelection[], $account :  Account, $producerSelection :  ProducerSelection, $createSingle :  boolean, $quoteType :  QuoteType, $uiHelper :  gw.web.job.submission.NewSubmissionUIHelper) : void {
    __widgetOf(this, pcf.ProductSelectionLV, SECTION_WIDGET_CLASS).setVariables(true, {$productOffers, $account, $producerSelection, $createSingle, $quoteType, $uiHelper})
  }
  
  
}