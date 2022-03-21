package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/LookupColumnPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LookupColumnPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($helper :  gw.web.bizrules.LookupUIHelper, $lookupDefDTO :  gw.lookup.LookupDefinitionDTO) : void {
    __widgetOf(this, pcf.LookupColumnPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$helper, $lookupDefDTO})
  }
  
  function refreshVariables ($helper :  gw.web.bizrules.LookupUIHelper, $lookupDefDTO :  gw.lookup.LookupDefinitionDTO) : void {
    __widgetOf(this, pcf.LookupColumnPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$helper, $lookupDefDTO})
  }
  
  
}