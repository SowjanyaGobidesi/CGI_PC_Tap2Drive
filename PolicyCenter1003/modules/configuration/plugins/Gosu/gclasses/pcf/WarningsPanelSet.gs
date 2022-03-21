package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/WarningsPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WarningsPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($warnings :  List<String>) : void {
    __widgetOf(this, pcf.WarningsPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$warnings})
  }
  
  function refreshVariables ($warnings :  List<String>) : void {
    __widgetOf(this, pcf.WarningsPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$warnings})
  }
  
  
}