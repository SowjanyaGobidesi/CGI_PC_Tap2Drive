package gw.lob.hop.financials

@Export
class HOPLineCovCostMethodsImpl extends GenericHOPCostMethodsImpl<HOPLineCovCost> {
  construct(owner: HOPLineCovCost) {
    super(owner)
  }

  override property get Coverage(): Coverage {
    return _owner.HOPLineCov
  }

  override property get OwningCoverable(): entity.HOPLine {
    return _owner.HOPLine
  }

  override property get Jurisdiction(): Jurisdiction {
    return _owner.Branch.BaseState
  }

}
