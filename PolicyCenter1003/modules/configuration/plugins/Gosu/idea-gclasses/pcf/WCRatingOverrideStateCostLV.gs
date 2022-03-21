package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/ratingoverride/WCRatingOverrideStateCostLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCRatingOverrideStateCostLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($stateCosts :  java.util.Set<WCCost>, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.WCRatingOverrideStateCostLV, SECTION_WIDGET_CLASS).setVariables(false, {$stateCosts, $jurisdiction})
  }
  
  function refreshVariables ($stateCosts :  java.util.Set<WCCost>, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.WCRatingOverrideStateCostLV, SECTION_WIDGET_CLASS).setVariables(true, {$stateCosts, $jurisdiction})
  }
  
  
}