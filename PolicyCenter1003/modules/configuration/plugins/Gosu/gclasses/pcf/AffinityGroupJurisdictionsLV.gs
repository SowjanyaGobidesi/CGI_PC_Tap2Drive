package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/affinitygroup/AffinityGroupJurisdictionsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AffinityGroupJurisdictionsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($affinityGroup :  AffinityGroup) : void {
    __widgetOf(this, pcf.AffinityGroupJurisdictionsLV, SECTION_WIDGET_CLASS).setVariables(false, {$affinityGroup})
  }
  
  function refreshVariables ($affinityGroup :  AffinityGroup) : void {
    __widgetOf(this, pcf.AffinityGroupJurisdictionsLV, SECTION_WIDGET_CLASS).setVariables(true, {$affinityGroup})
  }
  
  
}