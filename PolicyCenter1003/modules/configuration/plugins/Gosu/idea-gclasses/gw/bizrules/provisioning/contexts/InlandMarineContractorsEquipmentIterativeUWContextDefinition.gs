package gw.bizrules.provisioning.contexts

uses entity.ContractorsEquipment

@Export
class InlandMarineContractorsEquipmentIterativeUWContextDefinition extends InlandMarineUWContextDefinition {
  public static final var PARAM_CONTRACTORSEQUIPMENT: String = "imContractorsEquipment"

  construct() {
    addIterativeSymbol(PARAM_CONTRACTORSEQUIPMENT, ContractorsEquipment, \ec -> {
      return ec.Period.IMLine.ContractorsEquipPart != null ? ec.Period.IMLine.ContractorsEquipPart.ContractorsEquipments : {}
    })
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_IMPOLICYCONTRACTORSEQUIPMENTITERATIVE
  }
}