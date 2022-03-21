package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BALineDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BALineDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.BALineDV, SECTION_WIDGET_CLASS).setVariables(false, {$period})
  }
  
  function refreshVariables ($period :  PolicyPeriod) : void {
    __widgetOf(this, pcf.BALineDV, SECTION_WIDGET_CLASS).setVariables(true, {$period})
  }
  
  
}