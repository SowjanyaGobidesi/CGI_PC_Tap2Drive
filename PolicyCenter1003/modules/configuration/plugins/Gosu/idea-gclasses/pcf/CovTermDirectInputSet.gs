package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/CovTermDirectInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CovTermDirectInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($directCovTerm :  gw.api.domain.covterm.DirectCovTerm) : void {
    __widgetOf(this, pcf.CovTermDirectInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$directCovTerm})
  }
  
  function refreshVariables ($directCovTerm :  gw.api.domain.covterm.DirectCovTerm) : void {
    __widgetOf(this, pcf.CovTermDirectInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$directCovTerm})
  }
  
  
}