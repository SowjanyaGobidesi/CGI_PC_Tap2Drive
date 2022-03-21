package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BusinessAutoStateModifierPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BusinessAutoStateModifierPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($baLine :  BusinessAutoLine, $jurisdiction :  BAJurisdiction) : void {
    __widgetOf(this, pcf.BusinessAutoStateModifierPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$baLine, $jurisdiction})
  }
  
  function refreshVariables ($baLine :  BusinessAutoLine, $jurisdiction :  BAJurisdiction) : void {
    __widgetOf(this, pcf.BusinessAutoStateModifierPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$baLine, $jurisdiction})
  }
  
  
}