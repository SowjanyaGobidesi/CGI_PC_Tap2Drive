package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/TerritoryCodeInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TerritoryCodeInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($polLocation :  entity.PolicyLocation) : void {
    __widgetOf(this, pcf.TerritoryCodeInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$polLocation})
  }
  
  function refreshVariables ($polLocation :  entity.PolicyLocation) : void {
    __widgetOf(this, pcf.TerritoryCodeInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$polLocation})
  }
  
  
}