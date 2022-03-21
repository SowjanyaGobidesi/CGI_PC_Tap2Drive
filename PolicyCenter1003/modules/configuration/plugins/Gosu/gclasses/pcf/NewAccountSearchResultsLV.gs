package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/NewAccountSearchResultsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAccountSearchResultsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>, $producerSelection :  ProducerSelection) : void {
    __widgetOf(this, pcf.NewAccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(false, {$accountSummaries, $producerSelection})
  }
  
  function refreshVariables ($accountSummaries :  gw.api.database.IQueryBeanResult<AccountSummary>, $producerSelection :  ProducerSelection) : void {
    __widgetOf(this, pcf.NewAccountSearchResultsLV, SECTION_WIDGET_CLASS).setVariables(true, {$accountSummaries, $producerSelection})
  }
  
  
}