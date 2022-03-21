package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCRateTxDetailAggRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCRateTxDetailAggRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($aggTx :  WCTransaction) : void {
    __widgetOf(this, pcf.WCRateTxDetailAggRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$aggTx})
  }
  
  function refreshVariables ($aggTx :  WCTransaction) : void {
    __widgetOf(this, pcf.WCRateTxDetailAggRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$aggTx})
  }
  
  
}