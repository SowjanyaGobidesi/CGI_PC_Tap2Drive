package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCRetroRatingPlanBasicInfoInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCRetroRatingPlanBasicInfoInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($wCLine :  WorkersCompLine) : void {
    __widgetOf(this, pcf.WCRetroRatingPlanBasicInfoInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$wCLine})
  }
  
  function refreshVariables ($wCLine :  WorkersCompLine) : void {
    __widgetOf(this, pcf.WCRetroRatingPlanBasicInfoInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$wCLine})
  }
  
  
}