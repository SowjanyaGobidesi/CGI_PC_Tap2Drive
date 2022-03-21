package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/IMRatingCumulPanelSet.drilldown.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMRatingCumulPanelSet_drilldown extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMRatingCumulPanelSet_drilldown, SECTION_WIDGET_CLASS).setVariables(false, {$imLine})
  }
  
  function refreshVariables ($imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMRatingCumulPanelSet_drilldown, SECTION_WIDGET_CLASS).setVariables(true, {$imLine})
  }
  
  
}