package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/RICededPremiums_AllLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RICededPremiums_AllLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($ririsk :  RIRisk, $cededPremiumTransactions :  RICededPremiumTransaction[]) : void {
    __widgetOf(this, pcf.RICededPremiums_AllLV, SECTION_WIDGET_CLASS).setVariables(false, {$ririsk, $cededPremiumTransactions})
  }
  
  function refreshVariables ($ririsk :  RIRisk, $cededPremiumTransactions :  RICededPremiumTransaction[]) : void {
    __widgetOf(this, pcf.RICededPremiums_AllLV, SECTION_WIDGET_CLASS).setVariables(true, {$ririsk, $cededPremiumTransactions})
  }
  
  
}