package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/ratingoverride/RatingOverridePanelSet.WorkersCompLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingOverridePanelSet_WorkersCompLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.RatingOverridePanelSet_WorkersCompLine, SECTION_WIDGET_CLASS).setVariables(false, {$period})
  }
  
  function refreshVariables ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.RatingOverridePanelSet_WorkersCompLine, SECTION_WIDGET_CLASS).setVariables(true, {$period})
  }
  
  
}