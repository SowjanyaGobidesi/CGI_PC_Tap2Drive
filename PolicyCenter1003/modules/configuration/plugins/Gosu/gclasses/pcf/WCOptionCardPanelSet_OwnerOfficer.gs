package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/WCOptionCardPanelSet.OwnerOfficer.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WCOptionCardPanelSet_OwnerOfficer extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($wcLine :  WorkersCompLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.WCOptionCardPanelSet_OwnerOfficer, SECTION_WIDGET_CLASS).setVariables(false, {$wcLine, $openForEdit})
  }
  
  function refreshVariables ($wcLine :  WorkersCompLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.WCOptionCardPanelSet_OwnerOfficer, SECTION_WIDGET_CLASS).setVariables(true, {$wcLine, $openForEdit})
  }
  
  
}