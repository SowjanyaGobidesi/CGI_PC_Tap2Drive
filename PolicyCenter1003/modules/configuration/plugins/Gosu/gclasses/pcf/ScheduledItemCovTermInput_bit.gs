package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/ScheduledItemCovTermInput.bit.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScheduledItemCovTermInput_bit extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($covTerm :  gw.api.domain.covterm.CovTerm) : void {
    __widgetOf(this, pcf.ScheduledItemCovTermInput_bit, SECTION_WIDGET_CLASS).setVariables(false, {$covTerm})
  }
  
  function refreshVariables ($covTerm :  gw.api.domain.covterm.CovTerm) : void {
    __widgetOf(this, pcf.ScheduledItemCovTermInput_bit, SECTION_WIDGET_CLASS).setVariables(true, {$covTerm})
  }
  
  
}