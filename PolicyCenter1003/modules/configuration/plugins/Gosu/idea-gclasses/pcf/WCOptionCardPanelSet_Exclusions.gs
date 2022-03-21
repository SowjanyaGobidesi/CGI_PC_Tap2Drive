package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCOptionCardPanelSet.Exclusions.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCOptionCardPanelSet_Exclusions extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($wcLine :  WorkersCompLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.WCOptionCardPanelSet_Exclusions, SECTION_WIDGET_CLASS).setVariables(false, {$wcLine, $openForEdit})
  }
  
  function refreshVariables ($wcLine :  WorkersCompLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.WCOptionCardPanelSet_Exclusions, SECTION_WIDGET_CLASS).setVariables(true, {$wcLine, $openForEdit})
  }
  
  
}