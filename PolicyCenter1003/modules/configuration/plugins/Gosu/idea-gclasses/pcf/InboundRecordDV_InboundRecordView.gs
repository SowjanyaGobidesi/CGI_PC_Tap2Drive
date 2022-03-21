package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/inbound/InboundRecordDV.InboundRecordView.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InboundRecordDV_InboundRecordView extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($record :  KeyableBean) : void {
    __widgetOf(this, pcf.InboundRecordDV_InboundRecordView, SECTION_WIDGET_CLASS).setVariables(false, {$record})
  }
  
  function refreshVariables ($record :  KeyableBean) : void {
    __widgetOf(this, pcf.InboundRecordDV_InboundRecordView, SECTION_WIDGET_CLASS).setVariables(true, {$record})
  }
  
  
}