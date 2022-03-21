package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/flowmeta/DataFlowMaskDetailDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DataFlowMaskDetailDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($mask :  EntityFlowMaskData) : void {
    __widgetOf(this, pcf.DataFlowMaskDetailDV, SECTION_WIDGET_CLASS).setVariables(false, {$mask})
  }
  
  function refreshVariables ($mask :  EntityFlowMaskData) : void {
    __widgetOf(this, pcf.DataFlowMaskDetailDV, SECTION_WIDGET_CLASS).setVariables(true, {$mask})
  }
  
  
}