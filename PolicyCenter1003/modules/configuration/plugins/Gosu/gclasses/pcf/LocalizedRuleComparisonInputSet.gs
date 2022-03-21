package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/LocalizedRuleComparisonInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocalizedRuleComparisonInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.RuleVersionComparisonController, $commandDefinitionDiff :  gw.bizrules.diff.RuleMatchableDiffPair<RuleCommandDefinition>, $parameter :  gw.bizrules.provisioning.LocalizedRuleActionParameter) : void {
    __widgetOf(this, pcf.LocalizedRuleComparisonInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$controller, $commandDefinitionDiff, $parameter})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.RuleVersionComparisonController, $commandDefinitionDiff :  gw.bizrules.diff.RuleMatchableDiffPair<RuleCommandDefinition>, $parameter :  gw.bizrules.provisioning.LocalizedRuleActionParameter) : void {
    __widgetOf(this, pcf.LocalizedRuleComparisonInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$controller, $commandDefinitionDiff, $parameter})
  }
  
  
}