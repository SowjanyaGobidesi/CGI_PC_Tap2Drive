package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/VariableExpressionFragCell.formula.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VariableExpressionFragCell_formula extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($ruleVarHolder :  gw.bizrules.pcf.RuleVariableHolder) : void {
    __widgetOf(this, pcf.VariableExpressionFragCell_formula, SECTION_WIDGET_CLASS).setVariables(false, {$ruleVarHolder})
  }
  
  function refreshVariables ($ruleVarHolder :  gw.bizrules.pcf.RuleVariableHolder) : void {
    __widgetOf(this, pcf.VariableExpressionFragCell_formula, SECTION_WIDGET_CLASS).setVariables(true, {$ruleVarHolder})
  }
  
  
}