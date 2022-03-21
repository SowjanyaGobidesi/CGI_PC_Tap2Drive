package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/outboundfile/OutboundRecordDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OutboundRecordDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($record :  OutboundRecord) : void {
    __widgetOf(this, pcf.OutboundRecordDV, SECTION_WIDGET_CLASS).setVariables(false, {$record})
  }
  
  function refreshVariables ($record :  OutboundRecord) : void {
    __widgetOf(this, pcf.OutboundRecordDV, SECTION_WIDGET_CLASS).setVariables(true, {$record})
  }
  
  
}