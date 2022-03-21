package gw.lob.im.financials

@Export
class IMAccountsRecCovCostAdapter extends IMCostAdapter{
  construct(owner : IMAccountsRecCovCost) {
    super(owner)
  }

  override property get NameOfCoverable() : String {
    return (super._owner as IMAccountsRecCovCost).IMAccountsRecCov.IMAccountsReceivable.IMBuilding.DisplayName
  }
}
