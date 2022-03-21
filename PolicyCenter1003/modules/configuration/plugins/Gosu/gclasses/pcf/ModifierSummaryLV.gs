package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/ModifierSummaryLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ModifierSummaryLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($modifiers :  Modifier[]) : void {
    __widgetOf(this, pcf.ModifierSummaryLV, SECTION_WIDGET_CLASS).setVariables(false, {$modifiers})
  }
  
  function refreshVariables ($modifiers :  Modifier[]) : void {
    __widgetOf(this, pcf.ModifierSummaryLV, SECTION_WIDGET_CLASS).setVariables(true, {$modifiers})
  }
  
  
}