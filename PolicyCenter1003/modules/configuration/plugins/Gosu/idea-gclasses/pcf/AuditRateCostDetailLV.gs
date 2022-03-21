package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditRateCostDetailLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditRateCostDetailLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($isPremiumReport :  boolean, $periodCosts :  java.util.Set<WCCost>, $ratingPeriod :  gw.lob.wc.rating.WCRatingPeriod) : void {
    __widgetOf(this, pcf.AuditRateCostDetailLV, SECTION_WIDGET_CLASS).setVariables(false, {$isPremiumReport, $periodCosts, $ratingPeriod})
  }
  
  function refreshVariables ($isPremiumReport :  boolean, $periodCosts :  java.util.Set<WCCost>, $ratingPeriod :  gw.lob.wc.rating.WCRatingPeriod) : void {
    __widgetOf(this, pcf.AuditRateCostDetailLV, SECTION_WIDGET_CLASS).setVariables(true, {$isPremiumReport, $periodCosts, $ratingPeriod})
  }
  
  
}