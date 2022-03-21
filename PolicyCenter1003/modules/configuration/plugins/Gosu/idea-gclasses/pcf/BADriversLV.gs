package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BADriversLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BADriversLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($thisBusinessAutoLine :  BusinessAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BADriversLV, SECTION_WIDGET_CLASS).setVariables(false, {$thisBusinessAutoLine, $openForEdit})
  }
  
  function refreshVariables ($thisBusinessAutoLine :  BusinessAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.BADriversLV, SECTION_WIDGET_CLASS).setVariables(true, {$thisBusinessAutoLine, $openForEdit})
  }
  
  
}