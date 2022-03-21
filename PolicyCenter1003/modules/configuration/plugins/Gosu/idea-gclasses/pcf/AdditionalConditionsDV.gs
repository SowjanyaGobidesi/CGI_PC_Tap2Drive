package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/AdditionalConditionsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdditionalConditionsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($coverable :  Coverable, $coverageCategories :  String[], $includeExclude :  boolean) : void {
    __widgetOf(this, pcf.AdditionalConditionsDV, SECTION_WIDGET_CLASS).setVariables(false, {$coverable, $coverageCategories, $includeExclude})
  }
  
  function refreshVariables ($coverable :  Coverable, $coverageCategories :  String[], $includeExclude :  boolean) : void {
    __widgetOf(this, pcf.AdditionalConditionsDV, SECTION_WIDGET_CLASS).setVariables(true, {$coverable, $coverageCategories, $includeExclude})
  }
  
  
}