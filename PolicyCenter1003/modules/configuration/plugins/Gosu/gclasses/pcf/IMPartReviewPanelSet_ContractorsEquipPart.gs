package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/contractorsequip/IMPartReviewPanelSet.ContractorsEquipPart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMPartReviewPanelSet_ContractorsEquipPart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMPartReviewPanelSet_ContractorsEquipPart, SECTION_WIDGET_CLASS).setVariables(false, {$imLine})
  }
  
  function refreshVariables ($imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMPartReviewPanelSet_ContractorsEquipPart, SECTION_WIDGET_CLASS).setVariables(true, {$imLine})
  }
  
  
}