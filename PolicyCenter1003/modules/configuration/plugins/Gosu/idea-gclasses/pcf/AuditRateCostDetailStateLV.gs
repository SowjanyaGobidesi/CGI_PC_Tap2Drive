package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditRateCostDetailStateLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditRateCostDetailStateLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($isPremiumReport :  boolean, $stateCosts :  java.util.Set<WCCost>, $basedOnStateCosts :  java.util.Set<WCCost>, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.AuditRateCostDetailStateLV, SECTION_WIDGET_CLASS).setVariables(false, {$isPremiumReport, $stateCosts, $basedOnStateCosts, $jurisdiction})
  }
  
  function refreshVariables ($isPremiumReport :  boolean, $stateCosts :  java.util.Set<WCCost>, $basedOnStateCosts :  java.util.Set<WCCost>, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.AuditRateCostDetailStateLV, SECTION_WIDGET_CLASS).setVariables(true, {$isPremiumReport, $stateCosts, $basedOnStateCosts, $jurisdiction})
  }
  
  
}