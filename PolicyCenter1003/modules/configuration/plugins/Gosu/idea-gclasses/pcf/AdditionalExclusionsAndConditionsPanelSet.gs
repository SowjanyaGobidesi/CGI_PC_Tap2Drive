package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/AdditionalExclusionsAndConditionsPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdditionalExclusionsAndConditionsPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($coverable :  Coverable, $coverageCategories :  String[], $includeExclude :  boolean) : void {
    __widgetOf(this, pcf.AdditionalExclusionsAndConditionsPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$coverable, $coverageCategories, $includeExclude})
  }
  
  function refreshVariables ($coverable :  Coverable, $coverageCategories :  String[], $includeExclude :  boolean) : void {
    __widgetOf(this, pcf.AdditionalExclusionsAndConditionsPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$coverable, $coverageCategories, $includeExclude})
  }
  
  
}