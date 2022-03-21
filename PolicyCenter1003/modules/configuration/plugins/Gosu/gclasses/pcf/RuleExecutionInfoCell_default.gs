package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleExecutionInfoCell.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleExecutionInfoCell_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($version :  RuleVersion, $versionController :  gw.bizrules.management.BizRulesVersionController) : void {
    __widgetOf(this, pcf.RuleExecutionInfoCell_default, SECTION_WIDGET_CLASS).setVariables(false, {$version, $versionController})
  }
  
  function refreshVariables ($version :  RuleVersion, $versionController :  gw.bizrules.management.BizRulesVersionController) : void {
    __widgetOf(this, pcf.RuleExecutionInfoCell_default, SECTION_WIDGET_CLASS).setVariables(true, {$version, $versionController})
  }
  
  
}