package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/coverage/CovTermInputSet.Direct.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CovTermInputSet_Direct extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($term :  gw.api.domain.covterm.CovTerm, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CovTermInputSet_Direct, SECTION_WIDGET_CLASS).setVariables(false, {$term, $openForEdit})
  }
  
  function refreshVariables ($term :  gw.api.domain.covterm.CovTerm, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CovTermInputSet_Direct, SECTION_WIDGET_CLASS).setVariables(true, {$term, $openForEdit})
  }
  
  
}