package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/DifferencesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DifferencesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reason :  DiffReason, $basedOnPeriod :  PolicyPeriod, $currentPeriod :  PolicyPeriod, $rootNode :  gw.api.tree.RowTreeRootNode, $diffTreeConfig :  String) : void {
    __widgetOf(this, pcf.DifferencesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$reason, $basedOnPeriod, $currentPeriod, $rootNode, $diffTreeConfig})
  }
  
  function refreshVariables ($reason :  DiffReason, $basedOnPeriod :  PolicyPeriod, $currentPeriod :  PolicyPeriod, $rootNode :  gw.api.tree.RowTreeRootNode, $diffTreeConfig :  String) : void {
    __widgetOf(this, pcf.DifferencesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$reason, $basedOnPeriod, $currentPeriod, $rootNode, $diffTreeConfig})
  }
  
  
}