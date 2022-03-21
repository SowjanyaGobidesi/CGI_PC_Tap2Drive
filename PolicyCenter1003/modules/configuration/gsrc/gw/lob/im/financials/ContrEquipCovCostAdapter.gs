package gw.lob.im.financials

@Export
class ContrEquipCovCostAdapter extends IMCostAdapter {
  construct(owner : ContrEquipCovCost) {
    super(owner)
  }

  override property get NameOfCoverable() : String {
    return (super._owner as ContrEquipCovCost).ContractorsEquipCov.ContractorsEquipment.DisplayName
  }
}
