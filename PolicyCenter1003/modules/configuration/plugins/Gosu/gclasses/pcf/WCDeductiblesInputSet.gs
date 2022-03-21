package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCDeductiblesInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCDeductiblesInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.WCDeductiblesInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$jurisdiction})
  }
  
  function refreshVariables ($jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.WCDeductiblesInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$jurisdiction})
  }
  
  
}