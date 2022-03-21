package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BADriversDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BADriversDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($thisDriver :  CommercialDriver) : void {
    __widgetOf(this, pcf.BADriversDV, SECTION_WIDGET_CLASS).setVariables(false, {$thisDriver})
  }
  
  function refreshVariables ($thisDriver :  CommercialDriver) : void {
    __widgetOf(this, pcf.BADriversDV, SECTION_WIDGET_CLASS).setVariables(true, {$thisDriver})
  }
  
  
}