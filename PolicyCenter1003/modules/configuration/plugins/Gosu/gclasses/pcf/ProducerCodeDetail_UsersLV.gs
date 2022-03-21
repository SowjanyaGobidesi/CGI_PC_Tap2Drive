package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ProducerCodeDetail_UsersLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerCodeDetail_UsersLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($producerCode :  ProducerCode) : void {
    __widgetOf(this, pcf.ProducerCodeDetail_UsersLV, SECTION_WIDGET_CLASS).setVariables(false, {$producerCode})
  }
  
  function refreshVariables ($producerCode :  ProducerCode) : void {
    __widgetOf(this, pcf.ProducerCodeDetail_UsersLV, SECTION_WIDGET_CLASS).setVariables(true, {$producerCode})
  }
  
  
}