package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/contractorsequip/RateTxContractorsEquipmentCoveragesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTxContractorsEquipmentCoveragesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($equipment :  ContractorsEquipment, $txs :  java.util.Set<IMTransaction>) : void {
    __widgetOf(this, pcf.RateTxContractorsEquipmentCoveragesLV, SECTION_WIDGET_CLASS).setVariables(false, {$equipment, $txs})
  }
  
  function refreshVariables ($equipment :  ContractorsEquipment, $txs :  java.util.Set<IMTransaction>) : void {
    __widgetOf(this, pcf.RateTxContractorsEquipmentCoveragesLV, SECTION_WIDGET_CLASS).setVariables(true, {$equipment, $txs})
  }
  
  
}