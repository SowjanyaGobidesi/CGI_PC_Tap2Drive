package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/LossHistoryTypeSelectDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LossHistoryTypeSelectDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policy :  Policy) : void {
    __widgetOf(this, pcf.LossHistoryTypeSelectDV, SECTION_WIDGET_CLASS).setVariables(false, {$policy})
  }
  
  function refreshVariables ($policy :  Policy) : void {
    __widgetOf(this, pcf.LossHistoryTypeSelectDV, SECTION_WIDGET_CLASS).setVariables(true, {$policy})
  }
  
  
}