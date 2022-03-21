package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableDefinitionDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableDefinitionDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($tableDefinition :  RateTableDefinition, $definitionNotInUse :  boolean) : void {
    __widgetOf(this, pcf.RateTableDefinitionDV, SECTION_WIDGET_CLASS).setVariables(false, {$tableDefinition, $definitionNotInUse})
  }
  
  function refreshVariables ($tableDefinition :  RateTableDefinition, $definitionNotInUse :  boolean) : void {
    __widgetOf(this, pcf.RateTableDefinitionDV, SECTION_WIDGET_CLASS).setVariables(true, {$tableDefinition, $definitionNotInUse})
  }
  
  
}