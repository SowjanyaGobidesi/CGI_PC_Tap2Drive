package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCRateTxDetailLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCRateTxDetailLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($periodTxs :  java.util.Set<WCTransaction>) : void {
    __widgetOf(this, pcf.WCRateTxDetailLV, SECTION_WIDGET_CLASS).setVariables(false, {$periodTxs})
  }
  
  function refreshVariables ($periodTxs :  java.util.Set<WCTransaction>) : void {
    __widgetOf(this, pcf.WCRateTxDetailLV, SECTION_WIDGET_CLASS).setVariables(true, {$periodTxs})
  }
  
  
}