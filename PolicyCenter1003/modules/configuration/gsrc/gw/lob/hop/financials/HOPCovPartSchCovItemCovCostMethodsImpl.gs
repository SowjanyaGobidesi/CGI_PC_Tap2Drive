package gw.lob.hop.financials

@Export
class HOPCovPartSchCovItemCovCostMethodsImpl extends GenericHOPCostMethodsImpl<HOPCovPartSchCovItemCovCost> {
  construct(owner: HOPCovPartSchCovItemCovCost) {
    super(owner)
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPCovPartSchCovItemCov.HOPCovPartScheduleCovItem}

  override property get Jurisdiction(): Jurisdiction {
    return _owner.HOPLine.Branch.BaseState
  }

}
