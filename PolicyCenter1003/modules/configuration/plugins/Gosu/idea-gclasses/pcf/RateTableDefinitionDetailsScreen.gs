package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableDefinitionDetailsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableDefinitionDetailsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($tableDefinition :  RateTableDefinition, $disallowUpdate :  boolean) : void {
    __widgetOf(this, pcf.RateTableDefinitionDetailsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$tableDefinition, $disallowUpdate})
  }
  
  function refreshVariables ($tableDefinition :  RateTableDefinition, $disallowUpdate :  boolean) : void {
    __widgetOf(this, pcf.RateTableDefinitionDetailsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$tableDefinition, $disallowUpdate})
  }
  
  
}