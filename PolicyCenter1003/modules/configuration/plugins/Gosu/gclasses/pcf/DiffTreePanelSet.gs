package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/DiffTreePanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DiffTreePanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($branchName1 :  String, $branchName2 :  String, $rootNode :  gw.api.tree.RowTreeRootNode) : void {
    __widgetOf(this, pcf.DiffTreePanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$branchName1, $branchName2, $rootNode})
  }
  
  function refreshVariables ($branchName1 :  String, $branchName2 :  String, $rootNode :  gw.api.tree.RowTreeRootNode) : void {
    __widgetOf(this, pcf.DiffTreePanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$branchName1, $branchName2, $rootNode})
  }
  
  
}