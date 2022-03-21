package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BALineCoveragePanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BALineCoveragePanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($baLine :  BusinessAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BALineCoveragePanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$baLine, $openForEdit})
  }
  
  function refreshVariables ($baLine :  BusinessAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BALineCoveragePanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$baLine, $openForEdit})
  }
  
  
}