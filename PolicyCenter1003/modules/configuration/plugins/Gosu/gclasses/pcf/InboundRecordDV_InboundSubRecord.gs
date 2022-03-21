package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/inbound/InboundRecordDV.InboundSubRecord.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InboundRecordDV_InboundSubRecord extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($subrecord :  KeyableBean) : void {
    __widgetOf(this, pcf.InboundRecordDV_InboundSubRecord, SECTION_WIDGET_CLASS).setVariables(false, {$subrecord})
  }
  
  function refreshVariables ($subrecord :  KeyableBean) : void {
    __widgetOf(this, pcf.InboundRecordDV_InboundSubRecord, SECTION_WIDGET_CLASS).setVariables(true, {$subrecord})
  }
  
  
}