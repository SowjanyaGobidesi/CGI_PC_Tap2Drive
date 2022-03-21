package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleComparisonVariableInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleComparisonVariableInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.RuleVersionComparisonController, $variableDiff :  gw.bizrules.diff.RuleMatchableDiffPair<RuleVariable>) : void {
    __widgetOf(this, pcf.RuleComparisonVariableInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$controller, $variableDiff})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.RuleVersionComparisonController, $variableDiff :  gw.bizrules.diff.RuleMatchableDiffPair<RuleVariable>) : void {
    __widgetOf(this, pcf.RuleComparisonVariableInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$controller, $variableDiff})
  }
  
  
}