package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/ExpressionFragCell.formula.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExpressionFragCell_formula extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($fragHolder :  gw.bizrules.pcf.ExpressionFragmentHolder, $lineHolder :  gw.bizrules.pcf.RuleConditionLineHolder) : void {
    __widgetOf(this, pcf.ExpressionFragCell_formula, SECTION_WIDGET_CLASS).setVariables(false, {$fragHolder, $lineHolder})
  }
  
  function refreshVariables ($fragHolder :  gw.bizrules.pcf.ExpressionFragmentHolder, $lineHolder :  gw.bizrules.pcf.RuleConditionLineHolder) : void {
    __widgetOf(this, pcf.ExpressionFragCell_formula, SECTION_WIDGET_CLASS).setVariables(true, {$fragHolder, $lineHolder})
  }
  
  
}