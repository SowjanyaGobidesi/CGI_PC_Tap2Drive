package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ProducerCodeDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerCodeDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($producerCode :  ProducerCode, $producerCodeUIHelper :  gw.web.admin.ProducerCodeUIHelper) : void {
    __widgetOf(this, pcf.ProducerCodeDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$producerCode, $producerCodeUIHelper})
  }
  
  function refreshVariables ($producerCode :  ProducerCode, $producerCodeUIHelper :  gw.web.admin.ProducerCodeUIHelper) : void {
    __widgetOf(this, pcf.ProducerCodeDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$producerCode, $producerCodeUIHelper})
  }
  
  
}