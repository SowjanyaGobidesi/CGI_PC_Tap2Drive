package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/HoldRegionsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HoldRegionsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyHold :  PolicyHold) : void {
    __widgetOf(this, pcf.HoldRegionsLV, SECTION_WIDGET_CLASS).setVariables(false, {$policyHold})
  }
  
  function refreshVariables ($policyHold :  PolicyHold) : void {
    __widgetOf(this, pcf.HoldRegionsLV, SECTION_WIDGET_CLASS).setVariables(true, {$policyHold})
  }
  
  
}