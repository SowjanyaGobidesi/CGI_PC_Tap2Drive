package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWRuleComparisonCommandParametersInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWRuleComparisonCommandParametersInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.RuleVersionComparisonController, $commandDefinitionDiff :  gw.bizrules.diff.RuleMatchableDiffPair<RuleCommandDefinition>) : void {
    __widgetOf(this, pcf.UWRuleComparisonCommandParametersInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$controller, $commandDefinitionDiff})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.RuleVersionComparisonController, $commandDefinitionDiff :  gw.bizrules.diff.RuleMatchableDiffPair<RuleCommandDefinition>) : void {
    __widgetOf(this, pcf.UWRuleComparisonCommandParametersInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$controller, $commandDefinitionDiff})
  }
  
  
}