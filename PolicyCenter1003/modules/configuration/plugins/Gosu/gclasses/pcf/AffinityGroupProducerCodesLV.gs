package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/affinitygroup/AffinityGroupProducerCodesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AffinityGroupProducerCodesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($affinityGroup :  AffinityGroup) : void {
    __widgetOf(this, pcf.AffinityGroupProducerCodesLV, SECTION_WIDGET_CLASS).setVariables(false, {$affinityGroup})
  }
  
  function refreshVariables ($affinityGroup :  AffinityGroup) : void {
    __widgetOf(this, pcf.AffinityGroupProducerCodesLV, SECTION_WIDGET_CLASS).setVariables(true, {$affinityGroup})
  }
  
  
}