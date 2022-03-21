package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCRateTxDetailStateLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCRateTxDetailStateLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($stateTxs :  java.util.Set<WCTransaction>, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.WCRateTxDetailStateLV, SECTION_WIDGET_CLASS).setVariables(false, {$stateTxs, $jurisdiction})
  }
  
  function refreshVariables ($stateTxs :  java.util.Set<WCTransaction>, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.WCRateTxDetailStateLV, SECTION_WIDGET_CLASS).setVariables(true, {$stateTxs, $jurisdiction})
  }
  
  
}