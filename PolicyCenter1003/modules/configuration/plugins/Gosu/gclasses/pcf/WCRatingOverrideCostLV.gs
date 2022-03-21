package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/ratingoverride/WCRatingOverrideCostLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCRatingOverrideCostLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $periodCosts :  java.util.Set<WCCost>, $jurisdiction :  WCJurisdiction, $periodStart :  java.util.Date, $periodEnd :  java.util.Date) : void {
    __widgetOf(this, pcf.WCRatingOverrideCostLV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $periodCosts, $jurisdiction, $periodStart, $periodEnd})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $periodCosts :  java.util.Set<WCCost>, $jurisdiction :  WCJurisdiction, $periodStart :  java.util.Date, $periodEnd :  java.util.Date) : void {
    __widgetOf(this, pcf.WCRatingOverrideCostLV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $periodCosts, $jurisdiction, $periodStart, $periodEnd})
  }
  
  
}