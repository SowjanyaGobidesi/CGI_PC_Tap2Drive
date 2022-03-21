package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/inbound/InboundRecordDV.InboundRecord.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InboundRecordDV_InboundRecord extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($record :  KeyableBean) : void {
    __widgetOf(this, pcf.InboundRecordDV_InboundRecord, SECTION_WIDGET_CLASS).setVariables(false, {$record})
  }
  
  function refreshVariables ($record :  KeyableBean) : void {
    __widgetOf(this, pcf.InboundRecordDV_InboundRecord, SECTION_WIDGET_CLASS).setVariables(true, {$record})
  }
  
  
}