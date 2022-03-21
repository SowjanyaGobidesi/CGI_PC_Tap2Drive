package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ColumnDefinitionInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ColumnDefinitionInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($columnDefinition :  RateTableColumn, $tableDefinition :  RateTableDefinition, $advancedEdit :  boolean, $hideCodeAndLabelInSingleParameterMode :  boolean, $helper :  gw.pcf.rating.rtm.RateTableParameterSetHelper) : void {
    __widgetOf(this, pcf.ColumnDefinitionInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$columnDefinition, $tableDefinition, $advancedEdit, $hideCodeAndLabelInSingleParameterMode, $helper})
  }
  
  function refreshVariables ($columnDefinition :  RateTableColumn, $tableDefinition :  RateTableDefinition, $advancedEdit :  boolean, $hideCodeAndLabelInSingleParameterMode :  boolean, $helper :  gw.pcf.rating.rtm.RateTableParameterSetHelper) : void {
    __widgetOf(this, pcf.ColumnDefinitionInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$columnDefinition, $tableDefinition, $advancedEdit, $hideCodeAndLabelInSingleParameterMode, $helper})
  }
  
  
}