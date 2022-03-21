package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/ratingoverride/WCRatingOverrideCostDetailAggRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCRatingOverrideCostDetailAggRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($aggCost :  WCJurisdictionCost, $basedOnAggCost :  WCJurisdictionCost) : void {
    __widgetOf(this, pcf.WCRatingOverrideCostDetailAggRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$aggCost, $basedOnAggCost})
  }
  
  function refreshVariables ($aggCost :  WCJurisdictionCost, $basedOnAggCost :  WCJurisdictionCost) : void {
    __widgetOf(this, pcf.WCRatingOverrideCostDetailAggRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$aggCost, $basedOnAggCost})
  }
  
  
}