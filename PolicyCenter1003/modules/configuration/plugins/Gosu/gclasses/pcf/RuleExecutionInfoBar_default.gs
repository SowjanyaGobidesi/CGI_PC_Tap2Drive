package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleExecutionInfoBar.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleExecutionInfoBar_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($head :  RuleHead, $status :  RuleExecutionStatus, $versionController :  gw.bizrules.management.BizRulesVersionController) : void {
    __widgetOf(this, pcf.RuleExecutionInfoBar_default, SECTION_WIDGET_CLASS).setVariables(false, {$head, $status, $versionController})
  }
  
  function refreshVariables ($head :  RuleHead, $status :  RuleExecutionStatus, $versionController :  gw.bizrules.management.BizRulesVersionController) : void {
    __widgetOf(this, pcf.RuleExecutionInfoBar_default, SECTION_WIDGET_CLASS).setVariables(true, {$head, $status, $versionController})
  }
  
  
}