package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/ExpressionFragCell.nested.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ExpressionFragCell_nested extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($fragHolder :  gw.bizrules.pcf.ExpressionFragmentHolder, $lineHolder :  gw.bizrules.pcf.RuleConditionLineHolder) : void {
    __widgetOf(this, pcf.ExpressionFragCell_nested, SECTION_WIDGET_CLASS).setVariables(false, {$fragHolder, $lineHolder})
  }
  
  function refreshVariables ($fragHolder :  gw.bizrules.pcf.ExpressionFragmentHolder, $lineHolder :  gw.bizrules.pcf.RuleConditionLineHolder) : void {
    __widgetOf(this, pcf.ExpressionFragCell_nested, SECTION_WIDGET_CLASS).setVariables(true, {$fragHolder, $lineHolder})
  }
  
  
}