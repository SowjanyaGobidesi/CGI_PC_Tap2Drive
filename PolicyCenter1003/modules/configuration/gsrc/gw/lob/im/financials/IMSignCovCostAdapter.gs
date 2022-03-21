package gw.lob.im.financials

@Export
class IMSignCovCostAdapter extends IMCostAdapter {
  construct(owner : IMSignCovCost) {
    super(owner)
  }

  override property get NameOfCoverable() : String {
    return (super._owner as IMSignCovCost).IMSignCov.IMSign.DisplayName
  }
}
