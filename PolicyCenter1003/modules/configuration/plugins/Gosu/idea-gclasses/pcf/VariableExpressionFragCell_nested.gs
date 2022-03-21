package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/VariableExpressionFragCell.nested.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VariableExpressionFragCell_nested extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($ruleVarHolder :  gw.bizrules.pcf.RuleVariableHolder) : void {
    __widgetOf(this, pcf.VariableExpressionFragCell_nested, SECTION_WIDGET_CLASS).setVariables(false, {$ruleVarHolder})
  }
  
  function refreshVariables ($ruleVarHolder :  gw.bizrules.pcf.RuleVariableHolder) : void {
    __widgetOf(this, pcf.VariableExpressionFragCell_nested, SECTION_WIDGET_CLASS).setVariables(true, {$ruleVarHolder})
  }
  
  
}