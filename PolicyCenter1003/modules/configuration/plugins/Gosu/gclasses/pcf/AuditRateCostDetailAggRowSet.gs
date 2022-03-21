package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditRateCostDetailAggRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditRateCostDetailAggRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($isPremiumReport :  boolean, $aggCost :  WCJurisdictionCost, $basedOnAggCost :  WCJurisdictionCost) : void {
    __widgetOf(this, pcf.AuditRateCostDetailAggRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$isPremiumReport, $aggCost, $basedOnAggCost})
  }
  
  function refreshVariables ($isPremiumReport :  boolean, $aggCost :  WCJurisdictionCost, $basedOnAggCost :  WCJurisdictionCost) : void {
    __widgetOf(this, pcf.AuditRateCostDetailAggRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$isPremiumReport, $aggCost, $basedOnAggCost})
  }
  
  
}