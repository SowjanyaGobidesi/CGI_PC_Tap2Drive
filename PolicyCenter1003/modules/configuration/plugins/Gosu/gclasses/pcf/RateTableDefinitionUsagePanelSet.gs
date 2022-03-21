package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableDefinitionUsagePanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableDefinitionUsagePanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rateTables :  List<RateTable>) : void {
    __widgetOf(this, pcf.RateTableDefinitionUsagePanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$rateTables})
  }
  
  function refreshVariables ($rateTables :  List<RateTable>) : void {
    __widgetOf(this, pcf.RateTableDefinitionUsagePanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$rateTables})
  }
  
  
}