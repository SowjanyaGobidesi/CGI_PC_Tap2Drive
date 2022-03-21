package gw.lob.hop.financials

@Export
class HOPLineSchCovItemCovCostMethodsImpl extends GenericHOPCostMethodsImpl<HOPLineSchCovItemCovCost> {
  construct(owner: HOPLineSchCovItemCovCost) {
    super(owner)
  }

  override property get Coverage(): Coverage {
    return _owner.HOPLineSchCovItemCov
  }

  override property get OwningCoverable(): entity.HOPLineScheduleCovItem {
    return _owner.HOPLineSchCovItemCov.HOPLineScheduleCovItem
  }

  override property get Jurisdiction(): Jurisdiction {
    return _owner.Branch.BaseState
  }

}
