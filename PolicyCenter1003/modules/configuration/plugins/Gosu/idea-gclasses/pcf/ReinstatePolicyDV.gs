package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/reinstatement/ReinstatePolicyDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReinstatePolicyDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reinstatement :  Reinstatement) : void {
    __widgetOf(this, pcf.ReinstatePolicyDV, SECTION_WIDGET_CLASS).setVariables(false, {$reinstatement})
  }
  
  function refreshVariables ($reinstatement :  Reinstatement) : void {
    __widgetOf(this, pcf.ReinstatePolicyDV, SECTION_WIDGET_CLASS).setVariables(true, {$reinstatement})
  }
  
  
}