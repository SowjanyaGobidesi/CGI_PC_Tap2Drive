package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/RICoverageGroupsPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RICoverageGroupsPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($owner :  gw.api.domain.reinsurance.RICoverageGroupOwner) : void {
    __widgetOf(this, pcf.RICoverageGroupsPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$owner})
  }
  
  function refreshVariables ($owner :  gw.api.domain.reinsurance.RICoverageGroupOwner) : void {
    __widgetOf(this, pcf.RICoverageGroupsPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$owner})
  }
  
  
}