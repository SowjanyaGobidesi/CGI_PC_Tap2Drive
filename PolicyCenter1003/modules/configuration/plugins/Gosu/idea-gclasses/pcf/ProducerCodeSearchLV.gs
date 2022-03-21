package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ProducerCodeSearchLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerCodeSearchLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($producerCodes :  gw.api.database.IQueryBeanResult<ProducerCode>, $carrier :  Organization) : void {
    __widgetOf(this, pcf.ProducerCodeSearchLV, SECTION_WIDGET_CLASS).setVariables(false, {$producerCodes, $carrier})
  }
  
  function refreshVariables ($producerCodes :  gw.api.database.IQueryBeanResult<ProducerCode>, $carrier :  Organization) : void {
    __widgetOf(this, pcf.ProducerCodeSearchLV, SECTION_WIDGET_CLASS).setVariables(true, {$producerCodes, $carrier})
  }
  
  
}