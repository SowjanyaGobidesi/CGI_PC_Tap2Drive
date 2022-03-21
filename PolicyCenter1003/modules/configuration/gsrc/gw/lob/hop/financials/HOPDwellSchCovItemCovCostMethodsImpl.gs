package gw.lob.hop.financials

@Export
class HOPDwellSchCovItemCovCostMethodsImpl extends GenericHOPCostMethodsImpl<HOPDwellSchCovItemCovCost> {
  construct(owner: HOPDwellSchCovItemCovCost) {
    super(owner)
  }

  override property get OwningCoverable(): Coverable {
    return _owner.HOPDwellSchCovItemCov.HOPDwellScheduleCovItem
  }

  override property get Jurisdiction(): Jurisdiction {
    return _owner.HOPLine.Branch.BaseState
  }

}
